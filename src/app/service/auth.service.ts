import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn!: boolean;

  constructor(private http: HttpClient) {}

  applyLoginCredentials(userName: string, password: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-type', 'application/json');
    const requestOption = {
      headers: httpHeaders,
    };
    let loginUser = {
      id: 0,
      name: userName,
      password: password,
      emailId: userName,
      phoneNumber: userName,
    };
    return this.http.post(
      environment.DEFAULT_URL + 'login',
      loginUser,
      requestOption
    );
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
}
