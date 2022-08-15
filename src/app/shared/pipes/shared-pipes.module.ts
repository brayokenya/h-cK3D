import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelativeTimePipe} from './relative-time.pipe';
import {ExcerptPipe} from './excerpt.pipe';
import {GetValueByKeyPipe} from './get-value-by-key.pipe';
import {FormatterPipe} from './formatter.pipe';
import {HumanizePipe} from './humanize.pipe';
import {CapitalizePipe} from './capitalize.pipe';
import {KeepHtmlPipe} from './keep-html.pipe';
import {SearchFilterPipe} from './search-filter.pipe';
import {TruncatePipe} from './truncate.pipe';
import {TimePipe} from './time.pipe';
import {PaginatePipe} from './paginate.pipe';

const pipes = [
    RelativeTimePipe,
    ExcerptPipe,
    GetValueByKeyPipe,
    FormatterPipe,
    HumanizePipe,
    CapitalizePipe,
    KeepHtmlPipe,
    SearchFilterPipe,
    TruncatePipe,
    PaginatePipe,
    TimePipe
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: pipes,
    exports: pipes
})
export class SharedPipesModule {
}
