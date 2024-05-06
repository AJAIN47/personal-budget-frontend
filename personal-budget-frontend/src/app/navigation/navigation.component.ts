import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  isLoggedIn : boolean | undefined;

  constructor(
    private authService: AuthService
    ) { }

    ngOnInit(): void {
      this.authService.isAuthenticated().subscribe((loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      });
    }
    logout(): void {
      this.authService.logout();
    }
}
