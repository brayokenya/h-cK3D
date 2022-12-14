import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CollectionsComponent} from './collections.component';

describe('AppCollectionsComponent', () => {
    let component: CollectionsComponent;
    let fixture: ComponentFixture<CollectionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CollectionsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollectionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
