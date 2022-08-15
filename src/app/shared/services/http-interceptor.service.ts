import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/internal/operators';
import {AuthService} from './auth.service';
import {ToastrService} from 'ngx-toastr';
import {ILoginResponse} from '../models';
import {environment} from '../../../environments/environment';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    exemptedUris: string[] = [];

    constructor(private router: Router,
                private http: HttpClient,
                private auth: AuthService,
                private toast: ToastrService) {
        this.exemptedUris = [
            environment.USERS_BACKEND.REGISTRATION_ENDPOINT,
            environment.AUTH_BACKEND.TOKEN.default ?
                environment.AUTH_BACKEND.TOKEN.AUTH_ENDPOINT : environment.AUTH_BACKEND.JWT.AUTH_ENDPOINT,
            environment.USERS_BACKEND.USER_ENDPOINT
        ];
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.exemptedUris.includes(req.url) && environment.ENABLE_AUTH === true) {
            const newRequest = req.clone({
                headers: req.headers.set('Authorization',
                    `${environment.AUTH_BACKEND.AUTH_HEADER_PREFIX} ` + this.auth.token || ''),
            });
            return next.handle(newRequest).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // handle other responses here
                }
            }, (err: any) => {
                console.log('ERROR', err);
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 400) {
                        if (err.error.non_field_errors) {
                            this.toast.warning(err.error.non_field_errors.join());
                        } else if (err.error.field_errors) {
                            const fieldErrors = [];
                            for (const [key, value] of Object.entries(err.error.field_errors)) {
                                fieldErrors.concat([`${key}: ${value}`]);
                            }
                            this.toast.warning(fieldErrors.join());
                        } else if (err.error.error) {
                            this.toast.warning(err.error.error);
                        } else if (err.error.message) {
                            this.toast.warning(err.error.message);
                        } else {
                            this.toast.warning(JSON.stringify(err.error));
                        }
                    } else if (err.status === 401) {
                        if (environment.AUTH_BACKEND.JWT.default) {
                            this.http.post<ILoginResponse>(environment.AUTH_BACKEND.JWT.TOKEN_REFRESH_ENDPOINT, {
                                key: this.auth.token
                            }).subscribe(
                                tokenResp => {
                                    this.auth.updateToken(tokenResp.token);
                                },
                                (error: HttpErrorResponse) => {
                                    this.toast.warning(
                                        `It appears you have an invalid session. Please login and try again. ${error.statusText}`
                                    );
                                }
                            );
                        } else {
                            this.toast.info('It appears you have an invalid session. Please login and try again.');
                            this.auth.logout();
                            this.router.navigateByUrl('/auth/signin').then(nav => {},
                                error => console.log('Navigation Error', error));
                        }
                    } else if (err.status === 403) {
                        this.toast.warning(`Sorry, you are not authorized to perform this action. ${err.statusText}`);
                    } else if (err.status === 404) {
                        this.toast.warning(`${err.statusText}`);
                    } else if (err.status === 500) {
                        this.toast.warning('Internal server error. Please try again later.');
                    } else {
                        console.log(err);
                        this.toast.error(
                            'Something went wrong. Please ensure your internet is good and try again.'
                        );
                    }
                }
            }));
        }
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // handle other responses here
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401 || err.status === 403) {
                    this.auth.logout();
                    this.router.navigateByUrl('/auth/signin').then(nav => {}, error => console.log('Navigation Error', error));
                }
            }
        }));
    }
}
