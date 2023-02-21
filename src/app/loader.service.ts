import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);
  isLoading = this.loading.asObservable();

  constructor() {}

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
