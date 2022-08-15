import {ErrorHandler, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule, HAMMER_GESTURE_CONFIG, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GestureConfig} from '@angular/material';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpInterceptorService} from './shared/services';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ToastrModule} from 'ngx-toastr';
import {InMemoryDataService} from './shared/inmemory-db/inmemory-db.service';

import {from, Observable} from 'rxjs';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';

import {ErrorHandlerService} from './shared/services/error-handler.service';
import {SharedPipesModule} from './shared/pipes/shared-pipes.module';
import {environment} from '../environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

export class TranslateUniversalLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return from(import(`../assets/i18n/${lang}.json`));
    }
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        SharedPipesModule,
        AppRoutingModule,
        PerfectScrollbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateUniversalLoader,
                // useFactory: HttpLoaderFactory,
                // deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot(),
        // InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true})
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: ErrorHandler, useClass: ErrorHandlerService},
        {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        Title,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        {provide: 'API_HOST', useValue: environment.API_HOST},
        {provide: 'DEFAULT_LANGUAGE', useValue: environment.DEFAULT_LANGUAGE},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
