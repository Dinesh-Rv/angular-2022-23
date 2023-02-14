import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Task } from 'src/app/Task';
import { ToDoService } from 'src/app/to-do.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnChanges, OnInit {
  @Input() newTask!: Task;
  tasks: Task[] = [];
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
        });
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
      if (response) {
        this.getAllTasks;
      }
    });
  }

  ngOnInit() {
    this.commonService.presentTask.subscribe((presentTask) => {
      if (presentTask) {
        this.selectedTaskId = presentTask.id;
      }
    });
  }

  ngOnChanges() {
    this.getAllTasks();
  }
}
