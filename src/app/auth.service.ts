import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn!: boolean;

  constructor(private router: Router) {}

  applyLoginCredentials(userName: string, password: string) {
    if (userName == 'user' && password == 'jump') {
      this.isUserLoggedIn = true;
      this.router.navigate(['todo']);
      return true;
    } else {
      return false
    }
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
}
