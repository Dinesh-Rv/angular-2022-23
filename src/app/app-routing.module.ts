import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings/settings.component';
import { TodoMainComponent } from './dynamic/todo-main/todo-main.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './settings/profile/profile.component';
import { AddProfileComponent } from './common/add-profile/add-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo', canActivate: [AuthGuard], component: TodoMainComponent },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SettingsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  { path: 'newUser', component: AddProfileComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
