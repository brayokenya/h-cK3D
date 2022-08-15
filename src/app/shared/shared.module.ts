import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// SERVICES
import {ThemeService} from './services/theme.service';
import {NavigationService} from './services/navigation.service';
import {RoutePartsService} from './services/route-parts.service';
import {AuthGuard} from './services/auth/auth.guard';
import {AppConfirmService} from './services/app-confirm/app-confirm.service';
import {AppLoaderService} from './services/app-loader/app-loader.service';

import {SharedComponentsModule} from './components/shared-components.module';
import {SharedPipesModule} from './pipes/shared-pipes.module';
import {SharedDirectivesModule} from './directives/shared-directives.module';
import {PaginatePipe} from './pipes/paginate.pipe';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {ExcerptPipe} from './pipes/excerpt.pipe';
import {FormatterPipe} from './pipes/formatter.pipe';
import {HumanizePipe} from './pipes/humanize.pipe';
import {KeepHtmlPipe} from './pipes/keep-html.pipe';
import {RelativeTimePipe} from './pipes/relative-time.pipe';
import {SearchFilterPipe} from './pipes/search-filter.pipe';
import {TimePipe} from './pipes/time.pipe';
import {TruncatePipe} from './pipes/truncate.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule,
        SharedPipesModule,
        SharedDirectivesModule
    ],
    providers: [
        AuthGuard,
        ThemeService,
        NavigationService,
        RoutePartsService,
        AppConfirmService,
        AppLoaderService
    ],
    exports: [
        SharedComponentsModule,
        SharedPipesModule,
        SharedDirectivesModule
    ],
    declarations: [
        // Pipes and stuff
    ]
})
export class SharedModule {
}
