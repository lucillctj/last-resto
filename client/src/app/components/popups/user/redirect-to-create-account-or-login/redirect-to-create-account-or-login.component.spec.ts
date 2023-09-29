import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToCreateAccountOrLoginComponent } from './redirect-to-create-account-or-login.component';

describe('RedirectToCreateAccountComponent', () => {
  let component: RedirectToCreateAccountOrLoginComponent;
  let fixture: ComponentFixture<RedirectToCreateAccountOrLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedirectToCreateAccountOrLoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RedirectToCreateAccountOrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
