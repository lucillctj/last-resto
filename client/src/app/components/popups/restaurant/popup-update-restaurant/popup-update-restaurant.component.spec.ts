import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateRestaurantComponent } from './popup-update-restaurant.component';

describe('PopupUpdateRestaurantComponent', () => {
  let component: PopupUpdateRestaurantComponent;
  let fixture: ComponentFixture<PopupUpdateRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupUpdateRestaurantComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupUpdateRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
