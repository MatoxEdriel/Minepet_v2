import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import { LayoutLoginComponent } from './pages/Layout-login/Layout-login.component';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { VerifyCodeComponent } from './pages/verify-code/verify-code';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password';
import { FirstLoginComponent } from './component/first-login/first-login.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    AuthenticationRoutingModule,
    RouterOutlet,
    NgOtpInputModule,
    FormsModule,
    ToastComponent




  ],
  declarations: [LoginComponent, LayoutLoginComponent, VerifyCodeComponent, RecoveryPasswordComponent, ResetPasswordComponent, FirstLoginComponent],
})
export class AuthenticationModule { }
