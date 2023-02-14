import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from './category';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  selectedCategory!: Category;
  selectedTask!: any;
  isLeftSideVisible: boolean = true;
  private behaviourCategory = new BehaviorSubject(this.selectedCategory);
  private behaviourTask = new BehaviorSubject(this.selectedTask);
  private leftSide = new BehaviorSubject(this.isLeftSideVisible);
  presentCategory = this.behaviourCategory.asObservable();
  presentTask = this.behaviourTask.asObservable();
  isSideBarVisible = this.leftSide.asObservable();

  constructor() {}

  applySelectedCategory(category: Category) {
    this.behaviourCategory.next(category);
    this.behaviourTask.next(null);
  }

  applySelectedTask(task: any) {
    if (task == 1) {
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
