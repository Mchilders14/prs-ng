import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {

  title: string = "Line-Item-Create";
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  request: Request = new Request();
  submitBtnTitle: string = 'Create';

  constructor( // Injecting Services
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // populate list of products
    this.productSvc.list().subscribe(
      res => {
                this.products = res as Product[]; 
                console.log("List of Products: ", this.products); 
              },
      err => { 
                console.log(err); 
              }
    );
    // set current request
    this.lineItem.request = this.requestSvc.currentRequest;
  }

  save() {
    this.lineItemSvc.create(this.lineItem).subscribe(
      res => {
        this.lineItem = res as LineItem;
        this.router.navigateByUrl("/request-list");
      },
      err => { console.log(err); }
    );
  }

}
