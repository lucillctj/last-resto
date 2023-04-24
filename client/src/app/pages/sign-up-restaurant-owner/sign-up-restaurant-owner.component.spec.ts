import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpRestaurantComponent } from './sign-up-restaurant.component';

describe('SignUpRestaurantComponent', () => {
  let component: SignUpRestaurantComponent;
  let fixture: ComponentFixture<SignUpRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
