import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private countSubject = new BehaviorSubject<number>(0);
  
  constructor() { }

  setCount(count: number) {
    this.countSubject.next(count);
  }
  getCount() {
    return this.countSubject.asObservable();
  }
}
