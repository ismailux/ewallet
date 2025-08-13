import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupModeSelectPage } from './topup-mode-select.page';

describe('TopupModeSelectPage', () => {
  let component: TopupModeSelectPage;
  let fixture: ComponentFixture<TopupModeSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupModeSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
