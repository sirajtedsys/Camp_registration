import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EPDPage } from './e-p-d.page';

describe('EPDPage', () => {
  let component: EPDPage;
  let fixture: ComponentFixture<EPDPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EPDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
