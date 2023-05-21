import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOwnerDashboardComponent } from './restaurant-owner-dashboard.component';

describe('RestaurantOwnerProfilComponent', () => {
  let component: RestaurantOwnerDashboardComponent;
  let fixture: ComponentFixture<RestaurantOwnerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantOwnerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
