import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://3.17.23.84:3000';

  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');;
  addExpense(
    selectedBudget: string,
    expense: number,
    selectedMonth: string
  ): Observable<any> {
    let headers = new HttpHeaders();
    if (this.token !== null) {
      headers = headers.set('Authorization', this.token);
    }

    const data = {
      selectedBudget: selectedBudget,
      expense: expense,
      selectedMonth: selectedMonth,
    };
    return this.http.post<any>(`${this.apiUrl}/addExpense`, data, {
      headers: headers,
    });
  }

  getExpenseByMonth(month: string): Observable<any> {
    let headers = new HttpHeaders();
    if (this.token !== null) {
      headers = headers.set('Authorization', this.token);
    }
    return this.http.get<any>(`${this.apiUrl}/getExpense/${month}`, {
      headers: headers,
    });
  }
}
