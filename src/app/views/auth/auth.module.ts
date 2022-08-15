import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatToolbarModule
} from '@angular/material';
import {SharedMaterialModule} from '../../shared/shared-material.module';

import {FlexLayoutModule} from '@angular/flex-layout';
// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LockScreenComponent} from './lockscreen/lock-screen.component';
import {SignInComponent} from './signin/sign-in.component';
import {SignUpComponent} from './signup/sign-up.component';
import {SignOutComponent} from './sign-out/sign-out.component';
import {AuthRoutingModule} from './auth-routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedMaterialModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatNativeDateModule,
        MatRadioModule,
        MatToolbarModule
    ],
    declarations: [
        ForgotPasswordComponent,
        LockScreenComponent,
        SignInComponent,
        SignUpComponent,
        SignOutComponent,
        NotFoundComponent,
        ErrorComponent
    ]
})
export class AuthModule {
}
