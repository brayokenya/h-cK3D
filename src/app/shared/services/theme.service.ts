import {Inject, Injectable, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {getQueryParam} from '../helpers/url.helper';

export interface ITheme {
    name: string;
    baseColor?: string;
    isActive?: boolean;
}

@Injectable()
export class ThemeService {
    public appThemes: ITheme[] = [{
        name: 'app-dark-purple',
        baseColor: '#9c27b0',
        isActive: false
    }, {
        name: 'app-dark-pink',
        baseColor: '#e91e63',
        isActive: false
    }, {
        name: 'app-blue',
        baseColor: '#03a9f4',
        isActive: false
    }, {
        name: 'app-navy',
        baseColor: '#10174c',
        isActive: false
    }, {
        name: 'app-mookh',
        baseColor: '#FFFF00',
        isActive: true
    }];
    public activatedTheme: ITheme;
    private renderer: Renderer2;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    // Invoked in AppComponent and apply 'activatedTheme' on startup
    applyMatTheme(r: Renderer2, themeName: string) {
        this.renderer = r;

        this.activatedTheme = this.appThemes[2];

        // *********** ONLY FOR DEMO **********
        this.setThemeFromQuery();
        // ************************************

        // this.changeTheme(themeName);
        this.renderer.addClass(this.document.body, themeName);

    }

    changeTheme(prevTheme, themeName: string) {
        this.renderer.removeClass(this.document.body, prevTheme);
        this.renderer.addClass(this.document.body, themeName);
        this.flipActiveFlag(themeName);
    }

    flipActiveFlag(themeName: string) {
        this.appThemes.forEach((t) => {
            t.isActive = false;
            if (t.name === themeName) {
                t.isActive = true;
                this.activatedTheme = t;
            }
        });
    }

    // *********** ONLY FOR DEMO **********
    setThemeFromQuery() {
        const themeStr = getQueryParam('theme');
        try {
            this.activatedTheme = JSON.parse(themeStr);
            this.flipActiveFlag(this.activatedTheme.name);
        } catch (e) {
        }
    }
}
