import {AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

// import { EXAMPLE_COMPONENTS } from "assets/examples/examples";

@Component({
    selector: 'app-example-viewer',
    templateUrl: './example-viewer.component.html',
    styleUrls: ['./example-viewer.component.scss']
})
export class ExampleViewerComponent implements OnInit, AfterViewInit, OnDestroy {

    private anExampleId: string;
    exampleViewRef: ComponentRef<any>;
    componentPath: string;

    // Component ID
    @Input('exampleId')
    set exampleId(exampleId: string) {
        if (exampleId) {
            this.anExampleId = exampleId;
        } else {
            console.log('EXAMPLE ID MISSING');
        }
    }

    // Title and component Ref
    @Input('data') data: any;

    // Component Directory path
    @Input('path') path: any;

    get exampleId(): string {
        return this.anExampleId;
    }

    @ViewChild('exampleContainer', {read: ViewContainerRef, static: false}) exampleContainer: ViewContainerRef;
    constructor(private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.componentPath = this.path + this.exampleId + '/' + this.exampleId + '.component';
    }

    ngAfterViewInit() {
        if (!this.data) {
            console.log('EXAMPLE COMPONENT MISSING');
            return;
        }
        const componentFactory = this.cfr.resolveComponentFactory(this.data.component);
        this.exampleViewRef = this.exampleContainer.createComponent(componentFactory);
    }

    ngOnDestroy() {
        if (this.exampleViewRef) {
            this.exampleViewRef.destroy();
        }
    }
}
