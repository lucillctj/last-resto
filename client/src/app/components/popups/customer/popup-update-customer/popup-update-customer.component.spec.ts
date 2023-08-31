import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateCustomerComponent } from './popup-update-customer.component';

describe('PopupUpdateCustomerComponent', () => {
  let component: PopupUpdateCustomerComponent;
  let fixture: ComponentFixture<PopupUpdateCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupUpdateCustomerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupUpdateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
