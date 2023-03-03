import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../Task';
import { User } from '../User';
import { environment } from 'src/environments/environment.development';

type Category = {
  iconName: string;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(environment.DEFAULT_URL + 'categories');
  }

  addCategory(category: Category, url: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-type', 'application/json');
    const requestOption = {
      headers: httpHeaders,
    };
    return this.http.post(
      environment.DEFAULT_URL + url,
      category,
      requestOption
    );
  }

  saveOrUpdateTask(task: Task, url: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-type', 'application/json');
    const requestOption = {
      headers: httpHeaders,
    };
    return this.http.post(environment.DEFAULT_URL + url, task, requestOption);
  }

  getTasks(categoryId: number) {
    return this.http.get(environment.DEFAULT_URL + 'task/' + categoryId);
  }

  saveOrUpdateUser(user: User, url: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-type', 'application/json');
    const requestOption = {
      headers: httpHeaders,
    };
    return this.http.post(environment.DEFAULT_URL + url, user, requestOption);
  }
}
