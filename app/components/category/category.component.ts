import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public id!: number;
  public page: number = 0;
  public pageSize: number = 9;
  public paginatedProducts: Products[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 6;
  public totalItems: number = 0;
  public products: any[] = [];
  public products2: Products[] = [];
  public totalPages: number = 0;
  public isModalOpen: boolean = false;
  public selectedElement: any;
  public currentIndex = 0;
  public slideInterval: any;
  public filtro: string = '';
  @Input() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    public _productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getPaginatedProducts();
    this.startSlideShow();
  }

  getPaginatedProducts(){
    this._productsService.getAllProducts().subscribe((resp: Products[]) =>{
      resp.forEach(element => {
        if(element.category.id == this.id){
          this.products.push(element)
        }
      });
      this.products2 = this.products
      this.paginatedProducts = this.products;
      this.divideProductosEnPaginas();
    })
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.divideProductosEnPaginas();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.divideProductosEnPaginas();
    }
  }

  divideProductosEnPaginas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);

    this.totalItems = this.products.length;
    this.totalPages = Math.floor(this.totalItems / this.itemsPerPage);
  }

  openModal(element: any) {
    this.selectedElement = element;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
    }, 3000);
  }
  onSearchChanged(searchTerm: any) {
    this.filtro = searchTerm;
    this.paginatedProducts = this.products.filter(item => {
      return item.title.toLowerCase().includes(this.filtro.toLowerCase());
    });
    if(this.filtro == ''){
      this.divideProductosEnPaginas()
    }
  }
}
