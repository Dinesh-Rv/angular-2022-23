import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category';
import * as moment from 'moment';
import { ToDoService } from 'src/app/to-do.service';
import { Task } from 'src/app/Task';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss'],
})
export class TodoMainComponent implements OnInit {
  currentDate: any;
  isSideBarVisible!: boolean;
  taskName!: string;
  newTask!: Task;
  menuIcon!: string;
  selectedCategory!: Category;
  selectedTask!: Task;

  constructor(
    private toDoService: ToDoService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.currentDate = moment().format('dddd, MMMM D');
    this.commonService.presentCategory.subscribe((presentCategory) => {
      this.selectedCategory = presentCategory;
    });
    this.commonService.presentTask.subscribe((presentTask) => {
      this.selectedTask = presentTask;
    });
    this.commonService.isSideBarVisible.subscribe((isVisible) => {
      this.isSideBarVisible = isVisible;
    });
  }

  addTask(taskName: string) {
    let taskImportance = false;
    if (this.selectedCategory.id == 2) {
      taskImportance = true;
    }
    let newTask = {
      id: 0,
      name: taskName,
      isCompleted: false,
      createdAt: '',
      categoryIds: [this.selectedCategory.id],
      note: '',
      noteSavedAt: '',
      isImportant: taskImportance,
    };
    this.toDoService.saveOrUpdateTask(newTask, 'task').subscribe((response) => {
      if (response) {
        this.newTask = newTask;
      }
    });
  }
}
