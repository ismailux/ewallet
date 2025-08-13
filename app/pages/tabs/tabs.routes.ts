import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'statistic',
        loadComponent: () => import('../statistic/statistic.page').then((m) => m.StatisticPage),
      },
      {
        path: 'transactions',
        loadComponent: () => import('../transactions/transactions.page').then(m => m.TransactionsPage)
      },
      {
        path: 'transfer',
        children: [
          // Step 1: Mode selector
          {
            path: 'mode',
            loadComponent: () =>
              import('../transfer/mode-select/mode-select.page').then(
                m => m.ModeSelectPage
              )
          },
          // Step 2: Details (dynamic form per mode)
          {
            path: 'details',
            loadComponent: () =>
              import('../transfer/transfer-details/transfer-details.page').then(
                m => m.TransferDetailsPage
              )
          },
          // Step 3: Summary
          {
            path: 'summary',
            loadComponent: () =>
              import('../transfer/transfer-summary/transfer-summary.page').then(
                m => m.TransferSummaryPage
              )
          },
          // Step 4: Confirm PIN
          {
            path: 'confirm-pin',
            loadComponent: () =>
              import('../transfer/confirm-pin/confirm-pin.page').then(
                m => m.ConfirmPinPage
              )
          },
          // Step 5: Receipt
          {
            path: 'receipt',
            loadComponent: () =>
              import('../transfer/receipt/receipt.page').then(
                m => m.ReceiptPage
              )
          },
          // default to mode-select
          { path: '', redirectTo: 'mode', pathMatch: 'full' }
        ]
      },
      {
        path: 'add-recipient',
        loadComponent: () => import('../add-recipient/add-recipient.page').then(m => m.AddRecipientPage)
      },
      {
        path: 'send-money',
        loadComponent: () => import('../send-money/send-money.page').then(m => m.SendMoneyPage)
      },
      {
        path: 'transfer-summary',
        loadComponent: () => import('../transfer-summary/transfer-summary.page').then(m => m.TransferSummaryPage)
      },
      /* {
         path: 'confirm-pin',
         loadComponent: () => import('../confirm-pin/confirm-pin.page').then(m => m.ConfirmPinPage)
       },
       {
         path: 'receipt',
         loadComponent: () => import('../receipt/receipt.page').then(m => m.ReceiptPage)
       },*/
      {
        path: 'scan',
        loadComponent: () => import('../scan/scan.page').then(m => m.ScanPage)
      },
      {
        path: 'cards',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../cards/cards.page').then(m => m.CardsPage)
          },
          {
            path: 'add',
            loadComponent: () =>
              import('../cards/add-card/add-card.page').then(m => m.AddCardPage)
          }
        ]
      },
      {
        path: 'request-money',
        loadComponent: () => import('../request-money/request-money.page').then(m => m.RequestMoneyPage),
        children: [
          {
            path: '',
            redirectTo: 'details',
            pathMatch: 'full'
          },
          {
            path: 'details', // /tabs/request-money/details
            loadComponent: () => import('../request-money/request-details/request-details.page').then(m => m.RequestDetailsPage)
          },
          {
            path: 'qr', // /tabs/request-money/qr
            loadComponent: () => import('../request-money/request-qr/request-qr.page').then(m => m.RequestQrPage)
          }
        ]
      },
      {
        path: 'top-up',
        loadComponent: () => import('../top-up/top-up.page').then(m => m.TopUpPage),
        children: [
          { path: 'mode', loadComponent: () => import('../top-up/topup-mode-select/topup-mode-select.page').then(m => m.TopupModeSelectPage) },
          { path: 'details', loadComponent: () => import('../top-up/topup-details/topup-details.page').then(m => m.TopupDetailsPage) },
          { path: 'bank-details', loadComponent: () => import('../top-up/topup-bank-details/topup-bank-details.page').then(m => m.TopupBankDetailsPage) },
          { path: 'summary', loadComponent: () => import('../top-up/topup-summary/topup-summary.page').then(m => m.TopupSummaryPage) },
          { path: 'confirm-pin', loadComponent: () => import('../top-up/topup-confirm-pin/topup-confirm-pin.page').then(m => m.TopupConfirmPinPage) },
          { path: 'receipt', loadComponent: () => import('../top-up/topup-receipt/topup-receipt.page').then(m => m.TopupReceiptPage) },
          { path: '', redirectTo: 'mode', pathMatch: 'full' }
        ]
      },
      {
        path: 'bill',
        loadComponent: () => import('../bills/bills.page').then(m => m.BillsPage),
        children: [
          { path: 'list', loadComponent: () => import('../bills/bills-list/bills-list.page').then(m => m.BillsListPage) },
          { path: 'add', loadComponent: () => import('../bills/bill-add/bill-add.page').then(m => m.BillAddPage) },
          { path: ':id', loadComponent: () => import('../bills/bill-details/bill-details.page').then(m => m.BillDetailsPage) },
          { path: ':id/history', loadComponent: () => import('../bills/bill-history/bill-history.page').then(m => m.BillHistoryPage) },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
      },
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];