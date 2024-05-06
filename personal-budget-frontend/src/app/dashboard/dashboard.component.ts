import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { LineBudgetComponent } from '../line-budget/line-budget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, BarChartComponent, DonutChartComponent, PieChartComponent, LineBudgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router) {
  }

  redirectToExpense(): void {
    this.router.navigate(['/expense']);
  }
  redirectToBudget(): void {
    this.router.navigate(['/budget']);
  }
}

