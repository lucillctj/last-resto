import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarRestaurantOwnerComponent } from './nav-bar-restaurant-owner.component';

describe('NavBarRestaurantOwnerComponent', () => {
  let component: NavBarRestaurantOwnerComponent;
  let fixture: ComponentFixture<NavBarRestaurantOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarRestaurantOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarRestaurantOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
