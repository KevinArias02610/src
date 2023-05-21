import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Products } from 'src/app/interfaces/products.interface';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedElement: any;
  @Output() closeModal2: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    
  }

  closeModal() {
    this.closeModal2.emit();
  }

  actualizarCount(product: Products) {
    this.sharedDataService.setProduct([product]);
  }
}
