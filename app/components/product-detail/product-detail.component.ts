import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedElement: any;
  @Output() closeModal2: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    
  }

  closeModal() {
    this.closeModal2.emit();
  }
}
