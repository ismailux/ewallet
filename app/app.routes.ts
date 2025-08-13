import { Routes } from '@angular/router';
import { AddCardPage } from './pages/cards/add-card/add-card.page';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'transfer',
    loadComponent: () => import('./pages/transfer/transfer.page').then( m => m.TransferPage)
  },
  {
    path: 'add-recipient',
    loadComponent: () => import('./pages/add-recipient/add-recipient.page').then( m => m.AddRecipientPage)
  },
  {
    path: 'send-money',
    loadComponent: () => import('./pages/send-money/send-money.page').then( m => m.SendMoneyPage)
  },
  {
    path: 'confirm-pin',
    loadComponent: () => import('./pages/confirm-pin/confirm-pin.page').then( m => m.ConfirmPinPage)
  },
  {
    path: 'transfer-summary',
    loadComponent: () => import('./pages/transfer-summary/transfer-summary.page').then( m => m.TransferSummaryPage)
  },
  {
    path: 'receipt',
    loadComponent: () => import('./pages/receipt/receipt.page').then( m => m.ReceiptPage)
  },
  {
    path: 'cards',
    loadComponent: () => import('./pages/cards/cards.page').then( m => m.CardsPage)
  },
  {
    path: 'add-card',
    loadComponent: () => import('./pages/cards/add-card/add-card.page').then( m => m.AddCardPage)
  },
  {
    path: 'request-money',
    loadComponent: () => import('./pages/request-money/request-money.page').then( m => m.RequestMoneyPage)
  },
  {
    path: 'request-details',
    loadComponent: () => import('./pages/request-money/request-details/request-details.page').then( m => m.RequestDetailsPage)
  },
  {
    path: 'request-qr',
    loadComponent: () => import('./pages/request-money/request-qr/request-qr.page').then( m => m.RequestQrPage)
  },
  {
    path: 'mode-select',
    loadComponent: () => import('./pages/transfer/mode-select/mode-select.page').then( m => m.ModeSelectPage)
  },
  {
    path: 'transfer-details',
    loadComponent: () => import('./pages/transfer/transfer-details/transfer-details.page').then( m => m.TransferDetailsPage)
  },
  {
    path: 'transfer-summary',
    loadComponent: () => import('./pages/transfer/transfer-summary/transfer-summary.page').then( m => m.TransferSummaryPage)
  },
  {
    path: 'confirm-pin',
    loadComponent: () => import('./pages/transfer/confirm-pin/confirm-pin.page').then( m => m.ConfirmPinPage)
  },
  {
    path: 'receipt',
    loadComponent: () => import('./pages/transfer/receipt/receipt.page').then( m => m.ReceiptPage)
  },
  {
    path: 'top-up',
    loadComponent: () => import('./pages/top-up/top-up.page').then( m => m.TopUpPage)
  },
  {
    path: 'topup-mode-select',
    loadComponent: () => import('./pages/top-up/topup-mode-select/topup-mode-select.page').then( m => m.TopupModeSelectPage)
  },
  {
    path: 'topup-details',
    loadComponent: () => import('./pages/top-up/topup-details/topup-details.page').then( m => m.TopupDetailsPage)
  },
  {
    path: 'topup-summary',
    loadComponent: () => import('./pages/top-up/topup-summary/topup-summary.page').then( m => m.TopupSummaryPage)
  },
  {
    path: 'topup-confirm-pin',
    loadComponent: () => import('./pages/top-up/topup-confirm-pin/topup-confirm-pin.page').then( m => m.TopupConfirmPinPage)
  },
  {
    path: 'topup-receipt',
    loadComponent: () => import('./pages/top-up/topup-receipt/topup-receipt.page').then( m => m.TopupReceiptPage)
  },
  {
    path: 'topup-bank-details',
    loadComponent: () => import('./pages/top-up/topup-bank-details/topup-bank-details.page').then( m => m.TopupBankDetailsPage)
  },
  {
    path: 'bills',
    loadComponent: () => import('./pages/bills/bills.page').then( m => m.BillsPage)
  },
  {
    path: 'bills-list',
    loadComponent: () => import('./pages/bills/bills-list/bills-list.page').then( m => m.BillsListPage)
  },
  {
    path: 'bill-add',
    loadComponent: () => import('./pages/bills/bill-add/bill-add.page').then( m => m.BillAddPage)
  },
  {
    path: 'bill-details',
    loadComponent: () => import('./pages/bills/bill-details/bill-details.page').then( m => m.BillDetailsPage)
  },
  {
    path: 'bill-history',
    loadComponent: () => import('./pages/bills/bill-history/bill-history.page').then( m => m.BillHistoryPage)
  },
];