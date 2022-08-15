import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {LayoutService} from '../../services/layout.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../services';

@Component({
    selector: 'app-header-side',
    templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
    @Input() notificationPanel;
    public availableLangs = [{
        name: 'EN',
        code: 'en',
        flag: 'flag-icon-us'
    }, {
        name: 'ES',
        code: 'es',
        flag: 'flag-icon-es'
    }];
    currentLang = this.availableLangs[0];

    public appThemes;
    public layoutConf: any;

    constructor(private themeService: ThemeService,
                private layout: LayoutService,
                public translate: TranslateService,
                private renderer: Renderer2,
                public auth: AuthService) {
    }

    ngOnInit() {
        this.appThemes = this.themeService.appThemes;
        this.layoutConf = this.layout.layoutConf;
        this.translate.use(this.currentLang.code);
    }

    setLang(lng) {
        this.currentLang = lng;
        this.translate.use(lng.code);
    }

    changeTheme(theme) {
        // this.themeService.changeTheme(theme);
    }

    toggleNotifications() {
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

    toggleCollapse() {
        // compact --> full
        if (this.layoutConf.sidebarStyle === 'compact') {
            return this.layout.publishLayoutChange({
                sidebarStyle: 'full',
                sidebarCompactToggle: false
            }, {transitionClass: true});
        }

        // * --> compact
        this.layout.publishLayoutChange({
            sidebarStyle: 'compact',
            sidebarCompactToggle: true
        }, {transitionClass: true});

    }

    onSearch(e) {
        //   console.log(e)
    }
}
