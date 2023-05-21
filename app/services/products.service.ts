import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products.interface';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    public _http: HttpClient
  ) { }

  getAllProducts(): Observable<Products[]>{
    const url = `https://api.escuelajs.co/api/v1/products`;
    return this._http.get<Products[]>(url)
  }
}
