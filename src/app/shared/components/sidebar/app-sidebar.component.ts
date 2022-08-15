import {
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatchMediaService} from '../../services/match-media.service';
import {AuthService} from '../../services';
import {SidebarHelperService} from './sidebar-helper.service';

@Component({
    selector: 'app-egret-sidebar',
    templateUrl: './app-sidebar.component.html',
    styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit, OnDestroy {
    // Name
    @Input()
    name: string;

    // right
    @Input()
    @HostBinding('class.position-right')
    right: boolean;

    // Open
    @HostBinding('class.open')
    opened: boolean;

    @HostBinding('class.sidebar-locked-open')
    sidebarLockedOpen: boolean;

    @HostBinding('class.is-over')
    isOver: boolean;

    private backdrop: HTMLElement | null = null;

    private lockedBreakpoint = 'gt-sm';
    private unsubscribeAll: Subject<any>;

    constructor(private matchMediaService: MatchMediaService,
                private mediaObserver: MediaObserver,
                private sidebarHelperService: SidebarHelperService,
                private aRenderer: Renderer2,
                private anElementRef: ElementRef,
                private cdr: ChangeDetectorRef,
                public auth: AuthService) {
        this.unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.sidebarHelperService.setSidebar(this.name, this);

        if (this.mediaObserver.isActive(this.lockedBreakpoint)) {
            this.sidebarLockedOpen = true;
            this.opened = true;
        } else {
            this.sidebarLockedOpen = false;
            this.opened = false;
        }

        this.matchMediaService.onMediaChange
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(() => {
                // console.log("medua sub");
                if (this.mediaObserver.isActive(this.lockedBreakpoint)) {
                    this.sidebarLockedOpen = true;
                    this.opened = true;
                } else {
                    this.sidebarLockedOpen = false;
                    this.opened = false;
                }
            });
    }

    open() {
        this.opened = true;
        if (!this.sidebarLockedOpen && !this.backdrop) {
            this.showBackdrop();
        }
    }

    close() {
        this.opened = false;
        this.hideBackdrop();
    }

    toggle() {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    showBackdrop() {
        this.backdrop = this.aRenderer.createElement('div');
        this.backdrop.classList.add('egret-sidebar-overlay');

        this.aRenderer.appendChild(
            this.anElementRef.nativeElement.parentElement,
            this.backdrop
        );

        // Close sidebar onclick
        this.backdrop.addEventListener('click', () => {
            this.close();
        });

        this.cdr.markForCheck();
    }

    hideBackdrop() {
        if (this.backdrop) {
            this.backdrop.parentNode.removeChild(this.backdrop);
            this.backdrop = null;
        }

        this.cdr.markForCheck();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
        this.sidebarHelperService.removeSidebar(this.name);
    }
}

@Directive({
    selector: '[appSidebarToggler]'
})
export class SidebarTogglerDirective {
    @Input('appSidebarToggler')
    public id: any;

    constructor(private egretSidebarHelperService: SidebarHelperService) {
    }

    @HostListener('click')
    onClick() {
        this.egretSidebarHelperService.getSidebar(this.id).toggle();
    }
}
