import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    NavBarComponent],
  imports: [
    AppRoutingModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CommonModule { }
