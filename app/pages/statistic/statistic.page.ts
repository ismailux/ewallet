import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonIcon, IonButtons, IonBackButton, IonChip, IonButton, IonGrid, IonRow, IonCol, IonProgressBar } from '@ionic/angular/standalone';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { IgxDoughnutChartModule, IgxRingSeriesModule } from "igniteui-angular-charts";
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect,
    IonSelectOption, IonIcon, IonButtons, IonBackButton, IonChip, IonButton, IonGrid, IonRow, IonCol, IonProgressBar,
    BaseChartDirective, IgxDoughnutChartModule, IgxRingSeriesModule
  ],
})
export class StatisticPage implements OnInit, AfterViewInit {

  public showProgress = false;
  public months: string[];
  public selectedExpenseMonth: string;
  public selectedIncomeMonth: string;

  // --- PROPRIÉTÉS PRIVÉES ---
  private _barChartOptions: ChartConfiguration['options'];
  private _barChartType: ChartType = 'bar';
  private _barChartData: ChartData<'bar'>;

  private _expenseCategoryData: any[];
  private _expenseDoughnutDataSource: any[];
  private _selectedExpenseSliceInfo: string = "Total expenses";
  private _selectedExpenseSliceValue: string = "";
  private _centerExpenseTextSublabel: string = "";

  private _incomeCategoryData: any[];
  private _incomeDoughnutDataSource: any[];
  private _selectedIncomeSliceInfo: string = "Total income";
  private _selectedIncomeSliceValue: string = "";
  private _centerIncomeTextSublabel: string = "";

  // --- GETTERS PUBLICS ---
  public get barChartOptions() { return this._barChartOptions; }
  public get barChartType() { return this._barChartType; }
  public get barChartData() { return this._barChartData; }

  public get expenseCategoryData() { return this._expenseCategoryData; }
  public get expenseDoughnutDataSource() { return this._expenseDoughnutDataSource; }
  public get expenseDoughnutBrushes(): string[] { return this._expenseCategoryData.map(item => item.color); }
  public get selectedExpenseSliceInfo(): string { return this._selectedExpenseSliceInfo; }
  public get selectedExpenseSliceValue(): string { return this._selectedExpenseSliceValue; }
  public get centerExpenseTextSublabel(): string { return this._centerExpenseTextSublabel; }

  public get incomeCategoryData() { return this._incomeCategoryData; }
  public get incomeDoughnutDataSource() { return this._incomeDoughnutDataSource; }
  public get incomeDoughnutBrushes(): string[] { return this._incomeCategoryData.map(item => item.color); }
  public get selectedIncomeSliceInfo(): string { return this._selectedIncomeSliceInfo; }
  public get selectedIncomeSliceValue(): string { return this._selectedIncomeSliceValue; }
  public get centerIncomeTextSublabel(): string { return this._centerIncomeTextSublabel; }

  constructor(private router: Router) {


    // 1. Initialisation pour le Graphique en Barres
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
    this._barChartOptions = {
      responsive: true, maintainAspectRatio: false,
      scales: { x: { grid: { display: false } }, y: { min: 0, ticks: { callback: (v) => (typeof v === 'number' ? v + 'K' : v) } } },
      plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 12, boxHeight: 12, borderRadius: 4 } } },
    };
    this._barChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul'],
      datasets: [
        { data: [22, 38, 28, 25, 23, 25], label: 'Income', backgroundColor: '#1C0045', borderRadius: 6, barPercentage: 0.5, categoryPercentage: 0.5 },
        { data: [10, 17, 22, 19, 4, 17], label: 'Expense', backgroundColor: '#D2B6FC', borderRadius: 6, barPercentage: 0.5, categoryPercentage: 0.5 }
      ]
    };

    // 2. Initialisation des DÉPENSES
    this._expenseCategoryData = [
      { name: 'Renting Expenses', percentage: 45, transactions: 1, amount: -1100.88, icon: 'assets/icons/transaction_icons/housing.svg', color: '#3880ff' },
      { name: 'Shopping', percentage: 20, transactions: 2, amount: -200.73, icon: 'assets/icons/transaction_icons/shopping.svg', color: '#ffc409' },
      { name: 'Groceries', percentage: 8, transactions: 1, amount: -80.90, icon: 'assets/icons/transaction_icons/groceries.svg', color: '#eb445a' },
      { name: 'Medical', percentage: 5, transactions: 1, amount: -50.90, icon: 'assets/icons/transaction_icons/medicine.svg', color: '#2dd36f' },
      { name: 'Traveling', percentage: 22, transactions: 1, amount: -500.90, icon: 'assets/icons/transaction_icons/traveling.svg', color: '#786FA6' }
    ];
    this._expenseDoughnutDataSource = this._expenseCategoryData.map(item => ({ Value: item.percentage, Label: item.name }));
    const totalExpenses = this._expenseCategoryData.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenseTransactions = this._expenseCategoryData.reduce((sum, item) => sum + item.transactions, 0);
    this._selectedExpenseSliceInfo = "Total expenses";
    this._selectedExpenseSliceValue = `${totalExpenses.toFixed(2)} €`;
    this._centerExpenseTextSublabel = `${totalExpenseTransactions} transactions`;

    // 3. Initialisation des REVENUS
    this._incomeCategoryData = [
      { name: 'Salary', percentage: 85, transactions: 1, amount: 3500.00, icon: 'assets/icons/transaction_icons/salary.svg', color: '#2dd36f' },
      { name: 'Refunds', percentage: 15, transactions: 2, amount: 700.50, icon: 'assets/icons/transaction_icons/refund.svg', color: '#3880ff' },
    ];
    this._incomeDoughnutDataSource = this._incomeCategoryData.map(item => ({ Value: item.percentage, Label: item.name }));
    const totalIncome = this._incomeCategoryData.reduce((sum, item) => sum + item.amount, 0);
    const totalIncomeTransactions = this._incomeCategoryData.reduce((sum, item) => sum + item.transactions, 0);
    this._selectedIncomeSliceInfo = "Total income";
    this._selectedIncomeSliceValue = `+${totalIncome.toFixed(2)} €`;
    this._centerIncomeTextSublabel = `${totalIncomeTransactions} transactions`;

    // 4. Initialisation des mois
    const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthIndex = new Date().getMonth();
    const currentMonthName = allMonths[currentMonthIndex];
    this.months = allMonths.slice(0, currentMonthIndex + 1);
    this.selectedExpenseMonth = currentMonthName;
    this.selectedIncomeMonth = currentMonthName;
  }

  ngOnInit() { }

  ionViewWillEnter() {
    // show the progress bar
    this.showProgress = true;

    // hide progress bar after 2 seconds
    setTimeout(() => {
      this.showProgress = false;
    }, 2000);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const activeChipId = `expense-month-chip-${this.selectedExpenseMonth}`;
      const activeChip = document.getElementById(activeChipId);
      if (activeChip) {
        activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }, 100);
  }

  public selectExpenseMonth(month: string): void {
    this.selectedExpenseMonth = month;
  }

  public selectIncomeMonth(month: string): void {
    this.selectedIncomeMonth = month;
  }

  public onExpenseSliceClick(e: any) {
    if (e.args.isSelected) {
      const selectedItem = this.expenseCategoryData[e.args.index];
      this._selectedExpenseSliceInfo = selectedItem.name;
      this._selectedExpenseSliceValue = `${selectedItem.amount.toFixed(2)} €`;
      this._centerExpenseTextSublabel = `${selectedItem.transactions} transaction(s)`;
    } else {
      const totalAmount = this.expenseCategoryData.reduce((sum, item) => sum + item.amount, 0);
      const totalTransactions = this.expenseCategoryData.reduce((sum, item) => sum + item.transactions, 0);
      this._selectedExpenseSliceInfo = "Total expenses";
      this._selectedExpenseSliceValue = `${totalAmount.toFixed(2)} €`;
      this._centerExpenseTextSublabel = `${totalTransactions} transactions`;
    }
  }

  public onIncomeSliceClick(e: any) {
    if (e.args.isSelected) {
      const selectedItem = this.incomeCategoryData[e.args.index];
      this._selectedIncomeSliceInfo = selectedItem.name;
      this._selectedIncomeSliceValue = `+${selectedItem.amount.toFixed(2)} €`;
      this._centerIncomeTextSublabel = `${selectedItem.transactions} transaction(s)`;
    } else {
      const totalIncome = this.incomeCategoryData.reduce((sum, item) => sum + item.amount, 0);
      const totalIncomeTransactions = this.incomeCategoryData.reduce((sum, item) => sum + item.transactions, 0);
      this._selectedIncomeSliceInfo = "Total income";
      this._selectedIncomeSliceValue = `+${totalIncome.toFixed(2)} €`;
      this._centerIncomeTextSublabel = `${totalIncomeTransactions} transactions`;
    }
  }

  public goToHistory(): void {
    this.router.navigate(['/tabs/transactions']);
  }
}