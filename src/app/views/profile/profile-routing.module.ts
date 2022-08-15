import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {OverviewComponent} from './overview/overview.component';
import {SettingsComponent} from './settings/settings.component';
import {NgModule} from '@angular/core';

export const profileRouterConfig: Routes = [
    {
        path: '',
        component: ProfileComponent,
        children: [{
            path: 'settings',
            component: SettingsComponent,
            data: {title: 'Settings', breadcrumb: 'SETTINGS'}
        }, {
            path: '',
            component: OverviewComponent,
            data: {title: 'Overview', breadcrumb: 'OVERVIEW'}
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profileRouterConfig)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}
