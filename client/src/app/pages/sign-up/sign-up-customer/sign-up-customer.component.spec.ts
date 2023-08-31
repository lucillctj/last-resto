import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCustomerComponent } from './sign-up-customer.component';

describe('SignUpComponent', () => {
  let component: SignUpCustomerComponent;
  let fixture: ComponentFixture<SignUpCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpCustomerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
