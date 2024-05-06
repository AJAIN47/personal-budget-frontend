import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [AddExpenseComponent, FormsModule, NgClass, NgIf, NgFor],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
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
  selectedMonth: string = '';
  expenses: any[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    this.selectedMonth = this.months[currentMonthIndex];
    this.getExpenseByMonth();
  }

  getExpenseByMonth(): void {
    this.expenseService.getExpenseByMonth(this.selectedMonth).subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.expenses = response.map((item: any) => ({
            expense: item.spent_amount,
            budgetCriteria: item.budget_criteria,
          }));
        } else {
          this.expenses = [];
          console.error('No expense data found for the selected month.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onChangeMonth(): void {
    this.getExpenseByMonth();
  }

  showAddExpense: boolean = false;

  toggleAddExpense(): void {
    this.showAddExpense = !this.showAddExpense;
  }

  closeAddExpense(): void {
    this.showAddExpense = false;
    this.getExpenseByMonth();
  }
}
