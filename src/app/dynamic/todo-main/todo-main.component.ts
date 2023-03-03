import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category';
import { ToDoService } from 'src/app/service/to-do.service';
import { Task } from 'src/app/Task';
import { CommonService } from 'src/app/service/common.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
})
export class TodoMainComponent implements OnInit {
  currentDate!: any;
  isSideBarVisible!: boolean;
  taskName!: string;
  newTask!: Task;
  menuIcon!: string;
  selectedCategory!: Category;
  selectedTask!: Task;
  staticCategoryId: number = 5;
  toDoMainClass!: string;

  constructor(
    private toDoService: ToDoService,
    private commonService: CommonService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.currentDate = this.datePipe.transform(Date.now(), 'EEEE, MMMM d');
    this.commonService.presentCategory.subscribe((presentCategory) => {
      this.selectedCategory = presentCategory;
    });
    this.commonService.presentTask.subscribe((presentTask) => {
      this.selectedTask = presentTask;
      this.adjustToDoMain();
    });
    this.commonService.isSideBarVisible.subscribe((isVisible) => {
      this.isSideBarVisible = isVisible;
      this.adjustToDoMain();
    });
  }

  openLeftSide() {
    if (!this.isSideBarVisible) {
      this.commonService.controlLeftSide();
      this.isSideBarVisible = true;
      this.adjustToDoMain();
    }
  }

  addTask(taskName: string) {
    let taskImportance = false;
    let assignCategoryIds: number[] = [];
    if (taskName.trim() != '') {
      if (this.selectedCategory.id == environment.IMPORTANT_CATEGORY_ID) {
        taskImportance = true;
      }
      if (this.selectedCategory.id < environment.LAST_DEFAULT_CATEGORY) {
        assignCategoryIds.push(environment.LAST_DEFAULT_CATEGORY);
      }
      assignCategoryIds.push(this.selectedCategory.id);
      let newTask = {
        id: 0,
        name: taskName,
        isCompleted: false,
        createdAt: '',
        categoryIds: assignCategoryIds,
        note: '',
        noteSavedAt: '',
        isImportant: taskImportance,
      };
      this.toDoService
        .saveOrUpdateTask(newTask, 'task')
        .subscribe((response) => {
          if (response) {
            this.newTask = newTask;
          }
        });
    } else {
      alert(environment.INVALID_TASK_ALERT);
    }
  }

  adjustToDoMain() {
    if (this.isSideBarVisible && this.selectedTask) {
      this.toDoMainClass = environment.CENTER_COMPRESSED;
    } else if (!this.isSideBarVisible && !this.selectedTask) {
      this.toDoMainClass = environment.CENTER_FULL_SIZED;
    } else if (!this.isSideBarVisible) {
      this.toDoMainClass = environment.CENTER_LEFT_FILLED;
    } else if (!this.selectedTask) {
      this.toDoMainClass = environment.CENTER_RIGHT_FILLED;
    }
  }
}
