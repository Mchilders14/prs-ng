import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  title: string = 'Product-Detail';
  product: Product = new Product();
  productId: number = 0;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(
      res => {
        this.product = res as Product;
      },
      err => { console.log(err); }
    );
  }

  delete() {
    this.productSvc.delete(this.productId).subscribe(
      res => {
        this.product = res as Product;
        this.router.navigateByUrl('/product-list');
      },
      err => {
        console.log(err);
      }
    );

  }

}
