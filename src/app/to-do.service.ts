import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Task } from './Task';

const DEFAULT_URL = "http://localhost:8080/todo/";
type Category = {
  iconName: string,
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(DEFAULT_URL+"categories");
  }

  addCategory(category: Category, url: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append("Content-type", "application/json");
    const requestOption = {
      headers: httpHeaders,
    }
    return this.http.post(DEFAULT_URL + url , category, requestOption);
  }

  saveOrUpdateTask(task: Task, url: string) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append("Content-type", "application/json");
    const requestOption = {
      headers: httpHeaders,
    }
    return this.http.post(DEFAULT_URL + url, task, requestOption);
  }

  getTasks(categoryId: number) {
    return this.http.get(DEFAULT_URL+ "task/" +categoryId);
  }

}
