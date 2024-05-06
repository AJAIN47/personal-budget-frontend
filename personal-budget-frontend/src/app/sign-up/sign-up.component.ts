import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observer } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  signUpError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.signUpError = 'Passwords do not match';
      return;
    }
    const observer: Observer<any> = {
      next: (response: any) => {
        console.log('SignUp response:', response);
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          this.signUpError = 'SignUp Failed';
        }
      },
      error: (error: any) => {
        this.signUpError = error.message;
      },
      complete: () => {},
    };

    this.authService
      .signup(
        this.firstName,
        this.lastName,
        this.email,
        this.username,
        this.password
      )
      .subscribe(observer);
  }
}
