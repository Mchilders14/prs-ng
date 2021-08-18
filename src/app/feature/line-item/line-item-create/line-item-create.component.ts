import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

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
    private systemService: SystemService,
    private router: Router
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();

    // populate list of products
    this.productSvc.list().subscribe(
      res => {
                this.products = res as Product[]; 
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
        this.router.navigateByUrl("/request-lines/" + this.requestSvc.currentRequest.id);
      },
      err => { console.log(err); }
    );
  }

}
