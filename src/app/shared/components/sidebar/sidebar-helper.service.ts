import {Injectable} from '@angular/core';
import {AppSidebarComponent} from './app-sidebar.component';

@Injectable({
    providedIn: 'root'
})
export class SidebarHelperService {
    sidebarList: AppSidebarComponent[];

    constructor() {
        this.sidebarList = [];
    }

    setSidebar(name, sidebar): void {
        this.sidebarList[name] = sidebar;
    }

    getSidebar(name): any {
        return this.sidebarList[name];
    }

    removeSidebar(name) {
        if (!this.sidebarList[name]) {
            console.warn(`The sidebar with name '${name}' doesn't exist.`);
        }

        // remove sidebar
        delete this.sidebarList[name];
    }
}
