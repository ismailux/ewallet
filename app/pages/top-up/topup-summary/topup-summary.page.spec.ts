import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupSummaryPage } from './topup-summary.page';

describe('TopupSummaryPage', () => {
  let component: TopupSummaryPage;
  let fixture: ComponentFixture<TopupSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
