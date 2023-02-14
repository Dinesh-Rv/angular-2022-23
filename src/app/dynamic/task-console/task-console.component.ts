import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Task } from 'src/app/Task';
import { ToDoService } from 'src/app/to-do.service';

@Component({
  selector: 'app-task-console',
  templateUrl: './task-console.component.html',
  styleUrls: ['./task-console.component.scss'],
})
export class TaskConsoleComponent implements OnInit {
  selectedTask!: Task;
  constructor(
    private toDoService: ToDoService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.commonService.presentTask.subscribe((presentTask) => {
      this.selectedTask = presentTask;
    });
  }

  applyTaskStatus(eventTask: Task) {
    if (eventTask.isCompleted) {
      eventTask.isCompleted = false;
    } else {
      eventTask.isCompleted = true;
    }
    this.saveOrUpdateTask(eventTask);
  }

  applyTaskImportant(eventTask: Task) {
    if (eventTask.isImportant) {
      let categoryIndex = eventTask.categoryIds.indexOf(2);
      eventTask.categoryIds.splice(categoryIndex, 1);
      eventTask.isImportant = false;
    } else {
      eventTask.categoryIds.push(2);
      eventTask.isImportant = true;
    }
    this.saveOrUpdateTask(eventTask);
  }

  saveOrUpdateTask(task: Task) {
    this.toDoService.saveOrUpdateTask(task, 'task').subscribe((response) => {
      // if (response) {
      //   this.getAllTasks;
      // }
    });
  }

  removeSelectedTask() {
    this.commonService.applySelectedTask(1);
  }
}
