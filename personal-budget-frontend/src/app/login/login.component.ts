import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [SignUpComponent, RouterLink, RouterOutlet, FormsModule, NgIf]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const observer: Observer<any> = {
      next: (response: any) => {
        console.log('Login response:', response);
        if (response.response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError = 'Invalid credentials';
        }
      },
      error: (error: any) => {
        this.loginError = error.error.message;
      },
      complete: () => {},
    };

    this.authService.login(this.username, this.password).subscribe(observer)
  }
}
