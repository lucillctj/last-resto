import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToCreateAccountComponent } from './redirect-to-create-account.component';

describe('RedirectToCreateAccountComponent', () => {
  let component: RedirectToCreateAccountComponent;
  let fixture: ComponentFixture<RedirectToCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectToCreateAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectToCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
