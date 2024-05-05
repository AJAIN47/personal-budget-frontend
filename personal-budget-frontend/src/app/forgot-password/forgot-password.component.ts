import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  username: string = '';
  resetError: string = '';
  resetSuccess: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.resetPassword(this.username).subscribe(
        () => {
          this.resetSuccess = true;
          this.resetError = '';
        },
        error => {
          this.resetSuccess = false;
          this.resetError = error;
        }
      );
  }

}
