import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {}
  errorMessage!: string;
  userName!: string;
  password!: string;
  submitLogin() {
    console.log(this.userName + this.password);
    let applyLogin = this.authService.applyLoginCredentials(
      this.userName,
      this.password
    );

    applyLogin.subscribe((user) => {
      if (user != null) {
        this.commonService.applyLoggedUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['todo']);
      } else {
        this.errorMessage = 'Invalid Login Credentials';
      }
    });
    // if (!isLoginSuccessfull) {
    //   this.errorMessage = 'Invalid Login Credentials';
    // }
  }
}
