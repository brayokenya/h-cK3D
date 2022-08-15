import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {ChartsModule} from 'ng2-charts';
import {NgxEchartsModule} from 'ngx-echarts';
import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgMatSearchBarModule} from 'ng-mat-search-bar';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxPaginationModule} from 'ngx-pagination';
import {OrdersRoutingModule} from './orders-routing.module';
import {
    OrdersComponent,
    OrderFiltersDialogComponent,
    OrderAmountDialogComponent
} from './orders.component';
import {AllOrdersComponent} from './app-all/app-all.component';
import {SharedModule} from '../../../shared/shared.module';
import {SharedPipesModule} from '../../../shared/pipes/shared-pipes.module';
import {PendingOrdersComponent} from './app-pending/pending-orders.component';
import {CompletedOrdersComponent} from './app-completed/completed-orders.component';
import {ReversedOrdersComponent} from './app-reversed/reversed-orders.component';
import { RemittancesComponent } from './app-remittances/remittances.component';
import { CollectionsComponent } from './app-collections/collections.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrdersRoutingModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatChipsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTabsModule,
        MatInputModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatTableModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        FlexLayoutModule,
        NgxDatatableModule,
        ChartsModule,
        FileUploadModule,
        SharedModule,
        NgMatSearchBarModule,
        NgxPaginationModule,
        NgxEchartsModule,
        SharedPipesModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [
        OrdersComponent, OrderFiltersDialogComponent, OrderAmountDialogComponent, AllOrdersComponent,
        PendingOrdersComponent, CompletedOrdersComponent, ReversedOrdersComponent, RemittancesComponent, CollectionsComponent
    ],
    entryComponents: [
        OrderFiltersDialogComponent, OrderAmountDialogComponent
    ]
})
export class OrdersModule {
}
