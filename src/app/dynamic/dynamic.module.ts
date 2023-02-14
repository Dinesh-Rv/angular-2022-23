import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SideBarCategoryComponent } from './side-bar-category/side-bar-category.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { TodoMainComponent } from './todo-main/todo-main.component';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskConsoleComponent } from './task-console/task-console.component';

@NgModule({
  declarations: [SideBarComponent,
    SideBarCategoryComponent,
    SettingsComponent,
    TodoMainComponent,
    TaskListComponent,
    TaskConsoleComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    SideBarComponent,
    SideBarCategoryComponent,
    SettingsComponent
  ]
})
export class DynamicModule { }
