import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Products } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Products[] = [];
  public currentIndex = 0;
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(
    public _productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this._productsService.getAllProducts().subscribe((resp: Products[]) =>{
      this.products = resp
    })
  };
}
