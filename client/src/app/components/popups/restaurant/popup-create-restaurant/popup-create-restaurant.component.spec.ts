import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateRestaurantComponent } from './popup-create-restaurant.component';

describe('CreateRestaurantComponent', () => {
  let component: PopupCreateRestaurantComponent;
  let fixture: ComponentFixture<PopupCreateRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupCreateRestaurantComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupCreateRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
