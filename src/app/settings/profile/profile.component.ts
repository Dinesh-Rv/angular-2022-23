import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from 'src/app/service/to-do.service';
import { CommonService } from '../../service/common.service';
import { User } from '../../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loggedUser!: User;
  isInputLocked: boolean = true;
  editText: string = '';
  userName!: string;
  userEmail!: string;
  userPhoneNumber!: string;

  constructor(private toDoService: ToDoService, private router: Router) {}
  ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = this.loggedUser.name;
    this.userEmail = this.loggedUser.emailId;
    this.userPhoneNumber = this.loggedUser.phoneNumber;
  }

  editProfile() {
    this.isInputLocked = false;
  }

  saveUser() {
    if (this.userName && this.userEmail && this.userPhoneNumber) {
      let presentUser = this.loggedUser;
      presentUser.name = this.userName;
      presentUser.emailId = this.userEmail;
      presentUser.phoneNumber = this.userPhoneNumber;
      this.toDoService
        .saveOrUpdateUser(presentUser, 'user')
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['settings']);
            sessionStorage.setItem('user', JSON.stringify(response));
            alert('profile saved successfully');
          }
        });
    }
  }
}
