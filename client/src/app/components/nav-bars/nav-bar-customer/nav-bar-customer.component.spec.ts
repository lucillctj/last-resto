import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCustomerComponent } from './nav-bar-customer.component';

describe('NavBarComponent', () => {
  let component: NavBarCustomerComponent;
  let fixture: ComponentFixture<NavBarCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarCustomerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
