import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {LayoutService} from '../../services/layout.service';
import {CustomizerService} from '../../services/customizer.service';
import {ITheme, ThemeService} from '../../services/theme.service';

@Component({
    selector: 'app-customizer',
    templateUrl: './customizer.component.html',
    styleUrls: ['./customizer.component.scss']
})
export class CustomizerComponent implements OnInit {
    isCustomizerOpen = false;
    viewMode: 'options' | 'json' = 'options';
    sidenavTypes = [
        {
            name: 'Default Menu',
            value: 'default-menu'
        },
        {
            name: 'Separator Menu',
            value: 'separator-menu'
        },
        {
            name: 'Icon Menu',
            value: 'icon-menu'
        }
    ];
    sidebarColors: any[];
    topbarColors: any[];

    layoutConf;
    selectedMenu = 'icon-menu';
    selectedLayout: string;
    isTopbarFixed = false;
    isRTL = false;
    appThemes: ITheme[];
    perfectScrollbarEnabled = true;

    constructor(private navService: NavigationService,
                private layout: LayoutService,
                private themeService: ThemeService,
                public customizer: CustomizerService,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        this.layoutConf = this.layout.layoutConf;
        this.selectedLayout = this.layoutConf.navigationPos;
        this.isTopbarFixed = this.layoutConf.topbarFixed;
        this.isRTL = this.layoutConf.dir === 'rtl';
        this.appThemes = this.themeService.appThemes;
    }

    changeTheme(theme) {
        // this.themeService.changeTheme(theme);
        this.layout.publishLayoutChange({matTheme: theme.name});
    }

    changeLayoutStyle(data) {
        this.layout.publishLayoutChange({navigationPos: this.selectedLayout});
    }

    changeSidenav(data) {
        this.navService.publishNavigationChange(data.value);
    }

    toggleBreadcrumb(data) {
        this.layout.publishLayoutChange({useBreadcrumb: data.checked});
    }

    toggleTopbarFixed(data) {
        this.layout.publishLayoutChange({topbarFixed: data.checked});
    }

    toggleDir(data) {
        const dir = data.checked ? 'rtl' : 'ltr';
        this.layout.publishLayoutChange({dir});
    }

    tooglePerfectScrollbar(data) {
        this.layout.publishLayoutChange({perfectScrollbar: this.perfectScrollbarEnabled});
    }

}
