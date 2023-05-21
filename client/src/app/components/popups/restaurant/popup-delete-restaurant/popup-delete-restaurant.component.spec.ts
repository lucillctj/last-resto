import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteRestaurantComponent } from './popup-delete-restaurant.component';

describe('PopupDeleteRestaurantComponent', () => {
  let component: PopupDeleteRestaurantComponent;
  let fixture: ComponentFixture<PopupDeleteRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeleteRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDeleteRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
