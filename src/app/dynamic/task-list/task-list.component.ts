import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { Task } from 'src/app/Task';
import { ToDoService } from 'src/app/service/to-do.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnChanges, OnInit {
  @Input() newTask!: Task;
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  inCompleteTasks: Task[] = [];
  isCompletedToggleActive: boolean = false;
  toggleIcon: string = 'keyboard_arrow_right';
  selectedCategoryId: number = 0;
  selectedTaskId: number = 0;
  constructor(
    private toDoService: ToDoService,
    private commonService: CommonService
  ) {}

  getAllTasks() {
    let categoryId!: number;
    this.commonService.presentCategory.subscribe((category) => {
      if (category) {
        categoryId = category.id;
        this.toDoService.getTasks(categoryId).subscribe((existingTasks) => {
          this.tasks = existingTasks as Task[];
          this.separateTask();
        });
      }
    });
  }

  separateTask() {
    this.completedTasks = [];
    this.inCompleteTasks = [];
    this.tasks.forEach((task) => {
      if (task.isCompleted) {
        this.completedTasks.push(task);
      } else {
        this.inCompleteTasks.push(task);
      }
    });
  }

  applySelectedTask(value: Task) {
    this.commonService.applySelectedTask(value);
  }

  applyTaskStatus(eventTask: Task) {
    if (eventTask.isCompleted) {
      eventTask.isCompleted = false;
    } else {
      eventTask.isCompleted = true;
      this.completedTasks.push;
    }
    this.saveOrUpdateTask(eventTask);
    if (this.selectedTaskId === eventTask.id) {
      this.commonService.applySelectedTask(eventTask);
    }
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
    if (this.selectedTaskId === eventTask.id) {
      this.commonService.applySelectedTask(eventTask);
    }
  }

  saveOrUpdateTask(task: Task) {
    this.toDoService.saveOrUpdateTask(task, 'task').subscribe((response) => {
      if (response) {
        this.getAllTasks();
      }
    });
  }

  toggleCompletedTasks() {
    if (this.isCompletedToggleActive) {
      this.isCompletedToggleActive = false;
      this.toggleIcon = 'keyboard_arrow_right';
    } else {
      this.isCompletedToggleActive = true;
      this.toggleIcon = 'keyboard_arrow_down';
    }
  }

  ngOnInit() {
    this.commonService.presentTask.subscribe((presentTask) => {
      if (presentTask) {
        this.selectedTaskId = presentTask.id;
      } else {
        this.selectedTaskId = 0;
      }
    });
    this.commonService.updatedTaskValue.subscribe((task) => {
      if (task) {
        this.toDoService
          .saveOrUpdateTask(task, 'task')
          .subscribe((response) => {
            if (response) {
              this.getAllTasks();
            }
          });
      }
    });
    this.commonService.presentCategory.subscribe((presentCategory) => {
      if (presentCategory) {
        this.selectedCategoryId = presentCategory.id;
      }
    });
    // this.commonService.updateTask.subscribe((task) => { this.service.saveOry   })
  }

  ngOnChanges() {
    this.getAllTasks();
  }
}
