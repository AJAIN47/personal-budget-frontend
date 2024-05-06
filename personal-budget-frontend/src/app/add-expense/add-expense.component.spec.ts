import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseComponent } from './add-expense.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BudgetService } from '../services/budget.service';
import { ExpenseService } from '../services/expense.service';

fdescribe('AddExpenseComponent', () => {
  let component: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;
  let expenseService: jasmine.SpyObj<ExpenseService>;
  let budgetService: jasmine.SpyObj<BudgetService>;

  beforeEach(async () => {
    const expenseSpy = jasmine.createSpyObj('ExpenseService', ['addExpense']);
    const budgetSpy = jasmine.createSpyObj('BudgetService', ['getBudgetByMonth']);
    await TestBed.configureTestingModule({
      imports: [FormsModule, AddExpenseComponent],
      providers: [
        { provide: ExpenseService, useValue: expenseSpy },
        { provide: BudgetService, useValue: budgetSpy }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddExpenseComponent);
    component = fixture.componentInstance;
    expenseService = TestBed.inject(ExpenseService) as jasmine.SpyObj<ExpenseService>;
    budgetService = TestBed.inject(BudgetService) as jasmine.SpyObj<BudgetService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch budgets for selected month', () => {
    const mockResponse = [{ budget_criteria: 'Budget 1' }, { budget_criteria: 'Budget 2' }];
    (budgetService.getBudgetByMonth as jasmine.Spy).and.returnValue(of(mockResponse));

    component.selectedMonth = 'January';
    component.getBudgetsForSelectedMonth();

    expect(budgetService.getBudgetByMonth).toHaveBeenCalledWith('January');
    expect(component.budgets).toEqual(['Budget 1', 'Budget 2']);
  });

  it('should add expense when form is submitted', () => {
    const mockResponse = { /* Mock response from the service */ };
    (expenseService.addExpense as jasmine.Spy).and.returnValue(of(mockResponse));

    component.selectedMonth = 'January';
    component.selectedBudget = 'Budget 1';
    component.expense = 100;

    component.onSubmit();

    expect(expenseService.addExpense).toHaveBeenCalledWith('Budget 1', 100, 'January');
  });
});
