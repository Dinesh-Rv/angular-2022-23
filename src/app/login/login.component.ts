import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  errorMessage!: string;
  userName!: string;
  password!: string;
  submitLogin() {
    console.log(this.userName + this.password);
    let isLoginSuccessfull: boolean = this.authService.applyLoginCredentials(
      this.userName,
      this.password
    );
    if (!isLoginSuccessfull) {
      this.errorMessage = 'Invalid Login Credentials';
    }
  }
}
