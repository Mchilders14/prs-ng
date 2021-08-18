import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  title: string = "Product-Create";
  product: Product = new Product();
  vendors: Vendor[] = [];
  submitBtnTitle: string = 'Create';

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private systemService: SystemService
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();

    // populate list of vendors
    this.vendorSvc.list().subscribe(
      res => {
                this.vendors = res as Vendor[]; 
              },
      err => { 
                console.log(err); 
              }
    );
  }

  save() {
    this.productSvc.create(this.product).subscribe(
      res => {
        this.product = res as Product;
        this.router.navigateByUrl("/product-list");
      },
      err => { console.log(err); }
    );
  }

}
