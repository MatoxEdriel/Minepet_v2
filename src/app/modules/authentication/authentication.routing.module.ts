import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { Component, NgModule } from "@angular/core";
import { LayoutLoginComponent } from "./pages/Layout-login/Layout-login.component";
import { RecoveryPasswordComponent } from "./pages/recovery-password/recovery-password.component";
import { VerifyCodeComponent } from "./pages/verify-code/verify-code";
import { ResetPasswordComponent } from "./component/reset-password/reset-password";
import { FirstLoginComponent } from "./component/first-login/first-login.component";
import { authGuard } from "../../core/guards/auth-guard";
import { guestGuard } from "../../core/guards/guest-guard";


const routes: Routes = [
    {
        path: '',
        component: LayoutLoginComponent,
        children: [
            {
                path: 'sign-in',
                component: LoginComponent,
                canActivate: [guestGuard]
            },
            {
                path: 'recovery',
                component: RecoveryPasswordComponent
            },
            {
                path: 'verify',
                component: VerifyCodeComponent
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent
            },


            {
                path: '',
                redirectTo: 'sign-in',
                pathMatch: 'full'
            }


        ]
    },

    {
        path: 'change-password',
        component: FirstLoginComponent,
        canActivate: [authGuard]

    },


    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }