import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversedOrdersComponent } from './reversed-orders.component';

describe('AppReversedComponent', () => {
  let component: ReversedOrdersComponent;
  let fixture: ComponentFixture<ReversedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
