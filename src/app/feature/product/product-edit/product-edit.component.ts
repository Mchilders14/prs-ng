import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  title: string = "Product-Edit";
  product: Product = new Product();
  vendors: Vendor[] = [];
  submitBtnTitle: string = 'Edit';
  productId: number = 0;
  
  constructor(
    private productSvc: ProductService,
    private systemService: SystemService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();

    // get the product to edit
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(
      res => {
        this.product = res as Product;
      },
      err => { console.log(err); }
    );

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
    this.productSvc.edit(this.product).subscribe(
      res => {
        this.product = res as Product;
        this.router.navigateByUrl("/product-list");
      },
      err => { console.log(err); }
    );
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
}
