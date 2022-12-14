import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import {filter} from 'rxjs/operators';
import {RoutePartsService} from './shared/services/route-parts.service';
import {ThemeService} from './shared/services/theme.service';
import {LayoutService} from './shared/services/layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    appTitle = 'Mookh';
    pageTitle = '';

    constructor(public title: Title,
                private router: Router,
                private activeRoute: ActivatedRoute,
                private routePartsService: RoutePartsService,
                private themeService: ThemeService,
                private layout: LayoutService,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        this.changePageTitle();
    }

    ngAfterViewInit() {
        this.layout.applyMatTheme(this.renderer);
    }

    changePageTitle() {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
            const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
            if (!routeParts.length) {
                return this.title.setTitle(this.appTitle);
            }
            // Extract title from parts;
            this.pageTitle = routeParts
                .reverse()
                .map((part) => part.title)
                .reduce((partA, partI) => {
                    return `${partA} > ${partI}`;
                });
            this.pageTitle += ` | ${this.appTitle}`;
            this.title.setTitle(this.pageTitle);
        });
    }
}
