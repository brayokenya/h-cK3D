import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTabsModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ChartsModule} from 'ng2-charts';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {SharedPipesModule} from '../../shared/pipes/shared-pipes.module';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {SettingsComponent} from './settings/settings.component';
import {OverviewComponent} from './overview/overview.component';

@NgModule({
    declarations: [ProfileComponent, SettingsComponent, OverviewComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
        FlexLayoutModule,
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
        NgxDatatableModule,
        ChartsModule,
        FileUploadModule,
        SharedPipesModule
    ]
})
export class ProfileModule {
}
