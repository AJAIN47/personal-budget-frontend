import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ChartOptions, ChartType } from 'chart.js/auto';
import { BudgetService } from '../services/budget.service';
import { ExpenseService } from '../services/expense.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [FormsModule, NgFor, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})

export class BarChartComponent implements OnInit {
  selectedMonth: string = ''; // Selected month from the dropdown
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  barChartLegend = true;
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private expenseService: ExpenseService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    this.selectedMonth = this.months[currentMonthIndex];
    this.fetchDataForChart();
  }

  // fetchDataForChart(): void {
  //   this.budgetService.getBudgetByMonth(this.selectedMonth).subscribe(
  //     (budgetData: any) => {
  //       this.expenseService.getExpenseByMonth(this.selectedMonth).subscribe(
  //         (expenseData: any) => {
  //           this.barChartLabels = budgetData.map(
  //             (item: any) => item.budget_criteria
  //           );
  //           this.barChartData = [
  //             {
  //               data: budgetData.map((bud_item: any) => bud_item.amount),
  //               label: 'Budget',
  //               backgroundColor: '#808000',
  //             },
  //             {
  //               data: expenseData.map((exp_item: any) => exp_item.spent_amount),
  //               label: 'Expense',
  //               backgroundColor: '#704000',
  //             },
  //           ];
  //           this.refreshChart();
  //         },
  //         (error) => {
  //           console.error('Error fetching expense data:', error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error('Error fetching budget data:', error);
  //     }
  //   );
  // }

fetchDataForChart(): void {
  // Fetch both budget and expense data simultaneously
  forkJoin({
    budgetData: this.budgetService.getBudgetByMonth(this.selectedMonth),
    expenseData: this.expenseService.getExpenseByMonth(this.selectedMonth)
  }).pipe(
    map(({ budgetData, expenseData }) => {
      // Filter and map data based on matching criteria
      const matchedData = budgetData.map((budgetItem: any) => {
        const expenseItem = expenseData.find((exp: any) => exp.budget_criteria === budgetItem.budget_criteria);
        return {
          budget_criteria: budgetItem.budget_criteria,
          budget_amount: budgetItem.amount,
          expense_amount: expenseItem ? expenseItem.spent_amount : 0 // default to 0 if no matching criteria found
        };
      });

      return matchedData;
    })
  ).subscribe(
    (matchedData: any[]) => {
      this.barChartLabels = matchedData.map(item => item.budget_criteria);
      this.barChartData = [
        {
          data: matchedData.map(item => item.budget_amount),
          label: 'Budget',
          backgroundColor: '#808000',
        },
        {
          data: matchedData.map(item => item.expense_amount),
          label: 'Expense',
          backgroundColor: '#704000',
        }
      ];
      this.refreshChart();
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}

  refreshChart(): void {
    const chartConfig: ChartConfiguration = {
      type: this.barChartType,
      data: {
        labels: this.barChartLabels,
        datasets: this.barChartData,
      },
      options: this.barChartOptions,
    };

    const chartElement = document.getElementById(
      'barChart'
    ) as HTMLCanvasElement;
    if (chartElement) {
      const chart = new Chart(chartElement, chartConfig);
    }
  }

  onChangeMonth(): void {
    this.fetchDataForChart();
  }
}
