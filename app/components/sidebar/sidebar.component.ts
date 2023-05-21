import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { Products } from "src/app/interfaces/products.interface";
import { Category } from "src/app/interfaces/category.interface";
import { Router } from "@angular/router";
import { SharedDataService } from "src/app/services/shared-data.service";
import Swal from 'sweetalert2'
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  public category: Category[] = [];
  public cartProducts: Products[] = [];
  public count: number = 0;
  public showDropdown: boolean = false;
  public productsCart: Products[] = []
  constructor(
    public _productsService: ProductsService,
    public router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.sharedDataService.getProduct().subscribe((count) => {
      if(count.length !== 0){
        this.productsCart.forEach(element => {
          if(element.id == count[0].id){
            Swal.fire({
              icon: 'warning',
              title: '',
              text: 'Este producto ya se encuentra en el carrito.'
            });
            return
          }
        });
        this.productsCart.push(count[0]);
        this.productsCart = this.filterArrayProduct(this.productsCart);
        this.count = this.productsCart.length;
      }
    });
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

  filterArrayProduct(data: Products[]): Products[] {
    const uniqueArray = data.filter(
      (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );
    return uniqueArray;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  redirect(id: number) {
    this.router.navigate(["/home"]).then(() => {
      this.router.navigate(["/category", id])
    });
  }

  redirectHome() {
    this.router.navigate(["/home"]);
  }
  receiveCount(data: string) {
    console.log(data);
  }

  deleteProductCart(id: number){
    this.productsCart = this.productsCart.filter(function(obj) {
      return obj.id !== id;
    });
    this.count = this.productsCart.length;
  }
}
