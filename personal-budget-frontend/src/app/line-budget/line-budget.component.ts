import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';

@Component({
  selector: 'app-line-budget',
  standalone: true,
  imports: [],
  templateUrl: './line-budget.component.html',
  styleUrl: './line-budget.component.scss'
})

export class LineBudgetComponent implements OnInit {
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
  lineChartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Total Budget',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  lineChartType: ChartType = 'line';
  chartInstance: Chart | undefined;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.fetchDataForLineChart();
  }

  fetchDataForLineChart(): void {
    this.months.forEach((month: string) => {
      this.budgetService.getBudgetByMonth(month).subscribe(
        (budgetData: any[]) => {
          const totalBudget = budgetData.reduce(
            (acc: number, curr: any) => acc + curr.amount,
            0
          );
          if (this.lineChartData.labels) {
            this.lineChartData.labels.push(month);
          }
          this.lineChartData.datasets[0].data.push(totalBudget);

          this.sortChartData();
        },
        (error: any) => {
          console.error(`Error fetching budget data for ${month}:`, error);
        }
      );
    });
  }

  sortChartData(): void {
    if (this.lineChartData.labels) {
      const data = this.lineChartData.labels.map((label, index) => ({
        label: label as string,
        data: this.lineChartData.datasets[0].data[index],
      }));
      data.sort((a, b) => {
        return this.months.indexOf(a.label) - this.months.indexOf(b.label);
      });
      this.lineChartData.labels = data.map((item) => item.label);
      this.lineChartData.datasets[0].data = data.map((item) => item.data);

      if (this.lineChartData.labels.length === this.months.length) {
        this.refreshChart();
      }
    }
  }

  refreshChart(): void {
    const chartConfig: ChartConfiguration = {
      type: this.lineChartType,
      data: this.lineChartData,
      options: this.lineChartOptions,
    };

    const chartElement = document.getElementById(
      'budgetLineChart'
    ) as HTMLCanvasElement;
    if (chartElement) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.chartInstance = new Chart(chartElement, chartConfig);
    }
  }
}
