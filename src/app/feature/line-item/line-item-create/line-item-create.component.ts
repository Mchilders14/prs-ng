import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {

  title: string = "Product-Create";
  product: Product = new Product();
  vendors: Vendor[] = [];
  submitBtnTitle: string = 'Create';

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // populate list of vendors
    this.vendorSvc.list().subscribe(
      res => {
                this.vendors = res as Vendor[]; 
                console.log("List of Vendors: ", this.vendors); 
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
