import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
  export class authGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      return this.authService.isAuthenticated().pipe(
        map((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            return true;
          } else {
            return this.router.createUrlTree(['/login']);
          }
        })
      );
    }
  }
