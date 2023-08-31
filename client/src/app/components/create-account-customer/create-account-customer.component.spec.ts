import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountCustomerComponent } from './create-account-customer.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountCustomerComponent;
  let fixture: ComponentFixture<CreateAccountCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountCustomerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
