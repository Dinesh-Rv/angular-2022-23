import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../category';
import { User } from '../User';

const REMOVE_SELECTED_TASK: number = 1;
const LOGOUT: number = 2;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  selectedCategory!: Category;
  selectedTask!: any;
  isLeftSideVisible: boolean = true;
  updatedTask!: any;
  userLogged!: any;
  private behaviourCategory = new BehaviorSubject(this.selectedCategory);
  private behaviourTask = new BehaviorSubject(this.selectedTask);
  private leftSide = new BehaviorSubject(this.isLeftSideVisible);
  private taskConsoleValue = new BehaviorSubject(this.updatedTask);
  private userLoggedIn = new BehaviorSubject(this.userLogged);
  presentCategory = this.behaviourCategory.asObservable();
  presentTask = this.behaviourTask.asObservable();
  isSideBarVisible = this.leftSide.asObservable();
  updatedTaskValue = this.taskConsoleValue.asObservable();
  presentUser = this.userLoggedIn.asObservable();

  constructor() {}

  applyTaskConsoleValue(task: any) {
    this.taskConsoleValue.next(task);
  }

  applyLoggedUser(user: any) {
    if (user == LOGOUT) {
      this.userLoggedIn.next(null);
    } else if (user) {
      this.userLoggedIn.next(user);
    }
  }

  applySelectedCategory(category: Category) {
    this.behaviourCategory.next(category);
    this.behaviourTask.next(null);
  }

  applySelectedTask(task: any) {
    if (task == REMOVE_SELECTED_TASK) {
      this.behaviourTask.next(null);
    } else {
      this.behaviourTask.next(task);
    }
  }

  controlLeftSide() {
    if (this.isLeftSideVisible) {
      this.leftSide.next(false);
    } else {
      this.leftSide.next(true);
    }
  }
}
