import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from 'src/app/service/to-do.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit {
  loggedUser!: User;
  editText: string = '';
  userName!: string;
  userEmail!: string;
  userPhoneNumber!: string;
  userPassword!: string;
  userConfirmPassword!: string;
  errorMessage!: string;
  newUser!: User;

  constructor(private toDoService: ToDoService, private router: Router) {}
  ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = this.loggedUser.name;
    this.userEmail = this.loggedUser.emailId;
    this.userPhoneNumber = this.loggedUser.phoneNumber;
  }

  addUser() {
    let isUserInputValid: boolean = this.checkUserInput();
    if (isUserInputValid) {
      if (this.userPassword == this.userConfirmPassword) {
        let newUser = {
          id: 0,
          name: this.userName,
          password: this.userPassword,
          emailId: this.userEmail,
          phoneNumber: this.userPhoneNumber,
        };
        this.toDoService
          .saveOrUpdateUser(newUser, 'user')
          .subscribe((response) => {
            if (response) {
              this.router.navigate(['login']);
              sessionStorage.setItem('user', JSON.stringify(response));
              alert('account created successfully');
            }
          });
      } else {
        this.errorMessage = 'Passwords doesnt match';
      }
    }
  }

  checkUserInput() {
    let isUserInputValid: boolean = false;
    if (!this.userName) {
      this.errorMessage = 'please enter a valid username';
    } else if (!this.userEmail) {
      this.errorMessage = 'please enter a valid email';
    } else if (!this.userPhoneNumber) {
      this.errorMessage = 'please enter a valid phone number';
    } else if (!this.userPassword) {
      this.errorMessage = ' enter a valid password';
    } else {
      isUserInputValid = true;
    }
    return isUserInputValid;
  }
}
