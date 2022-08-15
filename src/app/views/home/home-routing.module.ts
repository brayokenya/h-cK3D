import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

export const homeRouterConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [{
            path: 'orders',
            loadChildren: () => import('./app-orders/orders.module').then(m => m.OrdersModule),
            data: {title: 'Orders', breadcrumb: 'ORDERS'}
        }, {
            path: '',
            redirectTo: 'orders'
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRouterConfig)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
