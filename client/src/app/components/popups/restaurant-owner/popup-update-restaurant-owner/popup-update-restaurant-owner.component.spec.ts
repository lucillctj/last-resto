import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateRestaurantOwnerComponent } from './popup-update-restaurant-owner.component';

describe('PopupUpdateRestaurantOwnerComponent', () => {
  let component: PopupUpdateRestaurantOwnerComponent;
  let fixture: ComponentFixture<PopupUpdateRestaurantOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupUpdateRestaurantOwnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupUpdateRestaurantOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
