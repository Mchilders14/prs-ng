import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    this.productSvc.list().subscribe(
      res => {
                this.products = res as Product[]; 
                console.log("List of Products: ", this.products); 
              },
      err => { 
                console.log(err); 
              }
      );
  }
}
