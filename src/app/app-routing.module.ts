import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/services/auth/auth.guard';
import {AdminLayoutComponent} from './shared/components/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './shared/components/layouts/auth-layout/auth-layout.component';

export const rootRouterConfig: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home/profile',
                loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'home',
                loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
                data: {title: 'Home', breadcrumb: 'HOME'}
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
                data: {title: 'Auth'}
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(rootRouterConfig, {useHash: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
