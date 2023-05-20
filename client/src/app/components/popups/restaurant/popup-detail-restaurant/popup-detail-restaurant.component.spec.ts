import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDetailRestaurantComponent } from './popup-detail-restaurant.component';

describe('PopupDetailRestaurantComponent', () => {
  let component: PopupDetailRestaurantComponent;
  let fixture: ComponentFixture<PopupDetailRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDetailRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDetailRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
