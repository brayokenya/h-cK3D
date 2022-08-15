import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {ResultComponent} from './result/result.component';
import {MatCardModule} from '@angular/material';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
    declarations: [ResultComponent],
    imports: [MatCardModule, CommonModule, NgxDatatableModule, SearchRoutingModule]
})
export class SearchModule {
}
