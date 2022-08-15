import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {AllOrdersComponent} from './app-all/app-all.component';
import {CompletedOrdersComponent} from './app-completed/completed-orders.component';
import {PendingOrdersComponent} from './app-pending/pending-orders.component';
import {ReversedOrdersComponent} from './app-reversed/reversed-orders.component';
import {RemittancesComponent} from './app-remittances/remittances.component';
import {CollectionsComponent} from './app-collections/collections.component';

const ordersRoutesConfig: Routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
            {
                path: 'all',
                component: AllOrdersComponent,
                data: {title: 'All', breadcrumb: 'ALL'}
            },
            {
                path: 'completed',
                component: CompletedOrdersComponent,
                data: {title: 'Completed', breadcrumb: 'COMPLETED'}
            },
            {
                path: 'pending',
                component: PendingOrdersComponent,
                data: {title: 'Pending', breadcrumb: 'PENDING'}
            },
            {
                path: 'reversed',
                component: ReversedOrdersComponent,
                data: {title: 'Reversed', breadcrumb: 'REVERSED'}
            },
            {
                path: 'collections',
                component: CollectionsComponent,
                data: {title: 'Collections', breadcrumb: 'COLLECTIONS'}
            },
            {
                path: 'remittances',
                component: RemittancesComponent,
                data: {title: 'Remittances', breadcrumb: 'REMITTANCES'}
            },
            {
                path: '',
                redirectTo: 'all'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(ordersRoutesConfig)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {
}
