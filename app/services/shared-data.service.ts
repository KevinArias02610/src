import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private countSubject = new BehaviorSubject<Products[]>([]);
  
  constructor() { }

  setProduct(product: Products[]) {
    this.countSubject.next(product);
  }
  getProduct() {
    return this.countSubject.asObservable();
  }
}
