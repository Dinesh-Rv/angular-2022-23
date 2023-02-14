import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './dynamic/settings/settings.component';
import { TodoMainComponent } from './dynamic/todo-main/todo-main.component';

const routes: Routes = [
  {path: 'todo', component:TodoMainComponent },
  {path: 'settings', component:SettingsComponent },
  {path: '', redirectTo: '/todo', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
