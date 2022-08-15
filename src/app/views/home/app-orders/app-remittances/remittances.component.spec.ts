import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RemittancesComponent} from './remittances.component';

describe('AppRemittancesComponent', () => {
    let component: RemittancesComponent;
    let fixture: ComponentFixture<RemittancesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RemittancesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RemittancesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
