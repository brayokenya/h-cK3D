import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {ILoginResponse, IUser} from '../models';
import {environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    attemptingLogin: boolean;
    loginError: string;
    user: IUser;
    token: string;
    session;

    constructor(private http: HttpClient,
                private router: Router) {
        this.session = localStorage.getItem(environment.APP_LABEL + '_authenticated');
        if (this.session != null) {
            this.user = JSON.parse(this.session).user;
            this.token = JSON.parse(this.session).key;
        }
    }

    login(authParam: string, loginPassword: string) {
        this.attemptingLogin = true;
        let body: any;
        if (environment.ENABLE_AUTH) {
            if (environment.AUTH_BACKEND.AUTH_PARAM === 'username') {
                body = {username: authParam, password: loginPassword};
            } else if (environment.AUTH_BACKEND.AUTH_PARAM === 'email') {
                body = {email: authParam, password: loginPassword};
            } else {
                body = {username: authParam, password: loginPassword};
            }
            this.http.post<ILoginResponse>(environment.AUTH_BACKEND.TOKEN.default ?
                environment.AUTH_BACKEND.TOKEN.AUTH_ENDPOINT : environment.AUTH_BACKEND.JWT.AUTH_ENDPOINT, body)
                .subscribe(
                    resp => {
                        const respHeaders: HttpHeaders = new HttpHeaders({
                            Authorization: `${environment.AUTH_BACKEND.AUTH_HEADER_PREFIX} ${resp.token}`
                        });
                        if (resp.user === undefined) {
                            this.http.get<ILoginResponse>(`${environment.USERS_BACKEND.USER_ENDPOINT}`, {headers: respHeaders}).subscribe(
                                userResp => {
                                    this.saveUserSession(resp.token, userResp.user);
                                },
                                (err: HttpErrorResponse) => {
                                    if (err.status === 400) {
                                        this.loginError = err.error.non_field_errors;
                                        setTimeout(() => {
                                            this.loginError = '';
                                        }, 3000);
                                    } else {
                                        if (err.error instanceof Error) {
                                            this.loginError = 'An error occurred:' + err.error.message;
                                        }
                                        if (err.status) {
                                            this.loginError = 'Error Code ' + err.status + '. Something went wrong. Try again.';
                                        }
                                        this.loginError =
                                            'Something went wrong. Ensure your API authentication server is running and try again.';
                                    }
                                    this.attemptingLogin = false;
                                    return false;
                                },
                                () => {
                                }
                            );
                        } else {
                            this.saveUserSession(resp.token, resp.user);
                        }
                    },
                    (errResponse: HttpErrorResponse) => {
                        if (errResponse.status === 400) {
                            this.loginError = errResponse.error.non_field_errors;
                            setTimeout(() => {
                                this.loginError = '';
                            }, 3000);
                        } else {
                            if (errResponse.error instanceof Error) {
                                this.loginError = 'An error occurred:' + errResponse.error.message;
                            }
                            if (errResponse.status) {
                                this.loginError = 'Error Code ' + errResponse.status + '. Something went wrong. Try again.';
                            }
                            this.loginError = 'Something went wrong. Ensure your API authentication server is running and try again.';
                        }
                        this.attemptingLogin = false;
                        return false;
                    });
        }
    }

    saveUserSession(token: string, sessionUser: IUser) {
        this.user = sessionUser;
        localStorage.setItem(environment.APP_LABEL + '_authenticated', JSON.stringify({user: sessionUser, key: token}));
    }

    updateToken(sessionKey: string) {
        if (this.session) {
            localStorage.removeItem(environment.APP_LABEL + '_authenticated');
            localStorage.setItem(environment.APP_LABEL + '_authenticated', JSON.stringify({user: this.user, key: sessionKey}));
        } else {
            this.token = sessionKey;
        }
    }

    logout() {
        localStorage.removeItem(environment.APP_LABEL + '_authenticated');
        this.user = null;
        this.token = null;
        this.router.navigateByUrl('/auth/signin');
    }

    isLoggedIn(): boolean {
        return this.user !== undefined && this.token !== undefined;
    }
}

export const AUTH_PROVIDERS: Array<any> = [
    {provide: AuthService, useClass: AuthService}
];
