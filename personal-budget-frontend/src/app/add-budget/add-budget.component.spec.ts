import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetComponent } from './add-budget.component';
import { BudgetService } from '../services/budget.service';
import { ExpenseService } from '../services/expense.service';

describe('AddBudgetComponent', () => {
  let component: AddBudgetComponent;
  let fixture: ComponentFixture<AddBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBudgetComponent],
      providers: [
        { provide: ExpenseService},
        { provide: BudgetService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
