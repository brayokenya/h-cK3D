import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ChartsModule} from 'ng2-charts';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatCardModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatChipsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatInputModule,
        MatProgressBarModule,
        FlexLayoutModule,
        NgxDatatableModule,
        ChartsModule,
        FileUploadModule,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule {
}
