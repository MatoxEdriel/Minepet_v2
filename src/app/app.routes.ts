import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth-guard";
import { guestGuard } from "./core/guards/guest-guard";
import { needsPasswordChangeGuard } from "./core/guards/needs-password-change-guard";

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    },


    {
        path: 'dashboard',
        canActivate: [authGuard, needsPasswordChangeGuard],
        loadChildren: () =>
            import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)

    }
    ,

    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'


    }





];
