import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {Subscription} from 'rxjs';
import {NavigationService} from '../../services/navigation.service';
import {ILayoutConf, LayoutService} from '../../services/layout.service';
import {AuthService} from '../../services';

@Component({
    selector: 'app-sidebar-side',
    templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
    public menuItems: any[];
    public hasIconTypeMenuItem: boolean;
    public iconTypeMenuTitle: string;
    private menuItemsSub: Subscription;
    public layoutConf: ILayoutConf;

    constructor(private navService: NavigationService,
                public themeService: ThemeService,
                public auth: AuthService,
                private layout: LayoutService) {
    }

    ngOnInit() {
        this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
        this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
            this.menuItems = menuItem;
            // Checks item list has any icon type.
            this.hasIconTypeMenuItem = !!this.menuItems.filter(
                item => item.type === 'icon'
            ).length;
        });
        this.layoutConf = this.layout.layoutConf;
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        if (this.menuItemsSub) {
            this.menuItemsSub.unsubscribe();
        }
    }

    toggleCollapse() {
        if (
            this.layoutConf.sidebarCompactToggle
        ) {
            this.layout.publishLayoutChange({
                sidebarCompactToggle: false
            });
        } else {
            this.layout.publishLayoutChange({
                // sidebarStyle: "compact",
                sidebarCompactToggle: true
            });
        }
    }
}
