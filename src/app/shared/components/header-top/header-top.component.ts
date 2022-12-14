import {Component, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {LayoutService} from '../../services/layout.service';
import {AuthService} from '../../services';

@Component({
    selector: 'app-header-top',
    templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, OnDestroy {
    layoutConf: any;
    menuItems: any;
    menuItemSub: Subscription;
    appThemes: any[] = [];
    currentLang = 'en';
    availableLangs = [{
        name: 'English',
        code: 'en',
    }, {
        name: 'Spanish',
        code: 'es',
    }];
    @Input() notificationPanel;

    constructor(private layout: LayoutService,
                private navService: NavigationService,
                public themeService: ThemeService,
                public translate: TranslateService,
                private renderer: Renderer2,
                public auth: AuthService) {
    }

    ngOnInit() {
        this.layoutConf = this.layout.layoutConf;
        this.appThemes = this.themeService.appThemes;
        this.menuItemSub = this.navService.menuItems$
            .subscribe(res => {
                res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
                const limit = 4;
                const mainItems: any[] = res.slice(0, limit);
                if (res.length <= limit) {
                    return this.menuItems = mainItems;
                }
                const subItems: any[] = res.slice(limit, res.length - 1);
                mainItems.push({
                    name: 'More',
                    type: 'dropDown',
                    tooltip: 'More',
                    icon: 'more_horiz',
                    sub: subItems
                });
                this.menuItems = mainItems;
            });
    }

    ngOnDestroy() {
        this.menuItemSub.unsubscribe();
    }

    setLang() {
        this.translate.use(this.currentLang);
    }

    changeTheme(theme) {
        this.layout.publishLayoutChange({matTheme: theme.name});
    }

    toggleNotification() {
        this.notificationPanel.toggle();
    }

    toggleSidenav() {
        if (this.layoutConf.sidebarStyle === 'closed') {
            return this.layout.publishLayoutChange({
                sidebarStyle: 'full'
            });
        }
        this.layout.publishLayoutChange({
            sidebarStyle: 'closed'
        });
    }
}
