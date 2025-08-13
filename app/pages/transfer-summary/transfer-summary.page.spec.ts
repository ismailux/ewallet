import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferSummaryPage } from './transfer-summary.page';

describe('TransferSummaryPage', () => {
  let component: TransferSummaryPage;
  let fixture: ComponentFixture<TransferSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
