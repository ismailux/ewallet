import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillAddPage } from './bill-add.page';

describe('BillAddPage', () => {
  let component: BillAddPage;
  let fixture: ComponentFixture<BillAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
