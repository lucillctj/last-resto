import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOwnerProfilComponent } from './restaurant-owner-profil.component';

describe('RestaurantOwnerProfilComponent', () => {
  let component: RestaurantOwnerProfilComponent;
  let fixture: ComponentFixture<RestaurantOwnerProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantOwnerProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOwnerProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
