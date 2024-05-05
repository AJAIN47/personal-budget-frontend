import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpenseComponent } from './expense/expense.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
{
path: '',
title: 'App Home Page',
component: HomepageComponent,
},
{ path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'signUp', component: SignUpComponent },
  { path: 'add-budget', component: AddBudgetComponent, canActivate: [authGuard] },
  { path: 'budget', component: BudgetComponent, canActivate: [authGuard] },
  { path: 'expense', component: ExpenseComponent, canActivate: [authGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];
