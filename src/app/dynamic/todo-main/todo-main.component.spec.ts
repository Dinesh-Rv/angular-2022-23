import { DatePipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from 'src/app/common/nav-bar/nav-bar.component';
import { SideBarCategoryComponent } from '../side-bar-category/side-bar-category.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TodoMainComponent } from './todo-main.component';


fdescribe('TodoMainComponent', () => {
  let component: TodoMainComponent;
  let fixture: ComponentFixture<TodoMainComponent>;
  let datePipe: DatePipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoMainComponent,
        TaskListComponent,
        SideBarComponent,
        NavBarComponent,
        SideBarCategoryComponent,
      ],
      imports: [FormsModule],
      providers: [HttpClient, HttpHandler, DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    datePipe = new DatePipe('en-us');
  });

  it('should create', () => {
    expect(component.staticCategoryId).toBeTruthy();
  });

  it('should provide a date to show', () => {
    expect(component.currentDate).toBe(
      datePipe.transform(Date.now(), 'EEEE, MMMM d')
    );
  });
});
