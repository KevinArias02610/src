import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/interfaces/products.interface';
import { Category } from 'src/app/interfaces/category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  public category: Category[] = [];
  public cartProducts: Products[] = [];
  public count: number = 0;
  public showDropdown: boolean = false;

  constructor(
    public _productsService: ProductsService,
    public router: Router
    ) {
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this._productsService.getAllProducts().subscribe((resp: Products[]) => {
      resp.forEach((cat) => {
        this.category.push(cat.category);
      });
      this.category = this.filterArray(this.category);
    });
  }

  filterArray(data: Category[]): Category[] {
    const uniqueArray = data.filter(
      (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );
    return uniqueArray;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  redirect(id: number){
    this.router.navigate(['/category', id]);
  }

  redirectHome(){
    this.router.navigate(['/home']);
  }
  
}
