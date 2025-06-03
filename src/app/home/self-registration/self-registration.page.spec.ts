import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelfRegistrationPage } from './self-registration.page';

describe('SelfRegistrationPage', () => {
  let component: SelfRegistrationPage;
  let fixture: ComponentFixture<SelfRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
