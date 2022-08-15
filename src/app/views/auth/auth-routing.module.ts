import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LockScreenComponent} from './lockscreen/lock-screen.component';
import {SignInComponent} from './signin/sign-in.component';
import {SignUpComponent} from './signup/sign-up.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';
import {SignOutComponent} from './sign-out/sign-out.component';

export const authRouterConfig: Routes = [
    {
        path: '',
        children: [
            {
                path: 'signup',
                component: SignUpComponent,
                data: {title: 'Sign Up'}
            },
            {
                path: 'signin',
                component: SignInComponent,
                data: {title: 'Sign In'}
            },
            {
                path: 'signout',
                component: SignOutComponent,
                data: {title: 'Sign Out'}
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
                data: {title: 'Forgot password'}
            },
            {
                path: 'lockscreen',
                component: LockScreenComponent,
                data: {title: 'Lockscreen'}
            },
            {
                path: '404',
                component: NotFoundComponent,
                data: {title: 'Not Found'}
            },
            {
                path: 'error',
                component: ErrorComponent,
                data: {title: 'Error'}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(authRouterConfig)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
