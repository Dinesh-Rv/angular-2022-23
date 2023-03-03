import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let loginUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    let isUserLoggedIn: boolean = false;

    for (let user in loginUser) {
      isUserLoggedIn = true;
      break;
    }

    if (!isUserLoggedIn) {
      this.router.navigate(['login']);
    }
    return isUserLoggedIn;
  }
}
