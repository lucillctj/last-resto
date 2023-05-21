import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpRestaurantOwnerComponent } from './sign-up-restaurant-owner.component';

describe('SignUpRestaurantComponent', () => {
  let component: SignUpRestaurantOwnerComponent;
  let fixture: ComponentFixture<SignUpRestaurantOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpRestaurantOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpRestaurantOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
