import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountRestaurantComponent } from './create-account-restaurant.component';

describe('CreateAccountRestaurantComponent', () => {
  let component: CreateAccountRestaurantComponent;
  let fixture: ComponentFixture<CreateAccountRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountRestaurantComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
