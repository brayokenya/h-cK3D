import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {InputErrorStateMatcher} from '../../../shared/validators';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../shared/services';
import {appAnimations} from '../../../shared/animations/app-animations';
import {ILoginResponse, IUser} from '../../../shared/models';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    animations: appAnimations
})
export class SignInComponent implements OnInit {
    returnUrl: any;
    error: string;
    hide = true;
    loginForm: FormGroup;
    attemptingLogin: boolean;
    emailFormControl: FormControl;
    passwordFormControl: FormControl;
    inputErrorMatcher: InputErrorStateMatcher;

    constructor(private http: HttpClient,
                private route: ActivatedRoute,
                private router: Router,
                public auth: AuthService,
                public toastService: ToastrService) {
        this.emailFormControl = new FormControl(null, [Validators.required, Validators.email]);
        this.passwordFormControl = new FormControl(null, [Validators.required]);
        this.inputErrorMatcher = new InputErrorStateMatcher();
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
        this.loginForm = new FormGroup(
            {
                username: new FormControl(null, [Validators.required, Validators.email]),
                password: new FormControl(null, [Validators.required])
            }
        );
    }

    attempt_login() {
        this.login(
            this.loginForm.controls.username.value,
            this.loginForm.controls.password.value,
            false
        );
    }

    login(authParam, loginPassword, remember: boolean) {
        let body: any;
        if (environment.ENABLE_AUTH) {
            this.attemptingLogin = true;
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
                    tokenResp => {
                        const reqHeaders: HttpHeaders = new HttpHeaders({
                            Authorization: `${environment.AUTH_BACKEND.AUTH_HEADER_PREFIX} ${tokenResp.token}`
                        });
                        if (tokenResp.user === undefined) {
                            this.http.get<IUser>(`${environment.USERS_BACKEND.USER_ENDPOINT}`, {headers: reqHeaders}).subscribe(
                                userResp => {
                                    this.saveSession(userResp, tokenResp.token, remember);
                                },
                                (err: any) => {
                                    this.toastService.error(`Unable to retrieve user profile information. ${err.statusText}`);
                                    this.error = err.statusText;
                                    setTimeout(() => {
                                        this.error = '';
                                    }, 3000);
                                },
                                () => {
                                    this.router.navigateByUrl(`${this.returnUrl}`);
                                }
                            );
                        } else {
                            this.saveSession(tokenResp.user, tokenResp.token, remember);
                            this.router.navigateByUrl(`${this.returnUrl}`);
                        }
                    },
                    (errResponse: HttpErrorResponse) => {
                        if (errResponse.status === 400) {
                            if (errResponse.error.non_field_errors) {
                                this.toastService.warning(errResponse.error.non_field_errors.join());
                            } else if (errResponse.error.field_errors) {
                                const fieldErrors = [];
                                for (const [key, value] of Object.entries(errResponse.error.field_errors)) {
                                    fieldErrors.concat([`${key}: ${value}`]);
                                }
                                this.error = fieldErrors.join();
                                this.toastService.warning(fieldErrors.join());
                            } else if (errResponse.error.error) {
                                this.toastService.warning(errResponse.error.error);
                            } else if (errResponse.error.message) {
                                this.toastService.warning(errResponse.error.message);
                            } else {
                                this.toastService.warning(JSON.stringify(errResponse.error));
                            }
                            this.attemptingLogin = false;
                        } else if (errResponse.status === 401) {
                            if (environment.AUTH_BACKEND.JWT.default) {
                                this.http.post<ILoginResponse>(environment.AUTH_BACKEND.JWT.TOKEN_REFRESH_ENDPOINT, {
                                    key: this.auth.token
                                }).subscribe(
                                    tokenResp => {
                                        this.auth.updateToken(tokenResp.token);
                                    },
                                    (error: HttpErrorResponse) => {
                                        this.toastService.warning(
                                            `It appears you have an invalid session. Please login and try again. ${error.statusText}`
                                        );
                                    }
                                );
                            } else {
                                this.toastService.info('It appears you have an invalid session. Please login and try again.');
                                this.auth.logout();
                                this.router.navigateByUrl('/auth/signin').then(nav => {},
                                    error => console.log('Navigation Error', error));
                            }
                            this.attemptingLogin = false;
                        } else if (errResponse.status === 403) {
                            this.toastService.warning(`Sorry, you are not authorized to perform this action. ${errResponse.statusText}`);
                            this.attemptingLogin = false;
                        } else if (errResponse.status === 404) {
                            this.toastService.warning(`${errResponse.statusText}`);
                        } else if (errResponse.status === 500) {
                            this.toastService.warning('Internal server error. Please try again later.');
                            this.attemptingLogin = false;
                        } else {
                            this.toastService.error(
                                'Something went wrong. Ensure your API authentication server is running and try again.'
                            );
                            this.attemptingLogin = false;
                        }
                        setTimeout(() => {
                            this.error = '';
                        }, 3000);
                        this.attemptingLogin = false;
                    });
        } else {
            if (authParam === 'admin@mookh.com' && loginPassword === '12345678') {
                localStorage.setItem(environment.APP_LABEL + '_authenticated', JSON.stringify({
                    user: {first_name: 'Mookh', last_name: 'Admin', email: 'admin@mookh.com'}, token: 'key_here'
                }));
                this.router.navigate(['/dashboard']);
            } else {
                this.auth.logout();
                return false;
            }
        }
    }

    saveSession(user: IUser, token: string, remember: boolean) {
        if (remember) {
            this.auth.user = user;
            this.auth.token = token;
            this.auth.saveUserSession(token, user);
        } else {
            this.auth.user = user;
            this.auth.token = token;
        }
    }

    logout() {
        this.auth.logout();
        return false;
    }
}
