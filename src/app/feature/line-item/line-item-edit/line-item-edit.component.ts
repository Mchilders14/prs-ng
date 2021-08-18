import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {

  title: string = "Line-Item-Create";
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  request: Request = new Request();
  submitBtnTitle: string = 'Edit';
  lineItemId: number = 0;

  constructor( // Injecting Services
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private systemService: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();

    // get line-item to edit
    this.route.params.subscribe(parms => this.lineItemId = parms["id"]);
    this.lineItemSvc.get(this.lineItemId).subscribe(
      res => {
        this.lineItem = res as LineItem;
      },
      err => { console.log(err); }
    );

     // populate list of products
     this.productSvc.list().subscribe(
      res => {
        this.products = res as Product[]; 
      },
      err => { 
        console.log(err); 
      }
    );
  }

  save() {
    this.lineItemSvc.edit(this.lineItem).subscribe(
      res => {
        this.lineItem = res as LineItem;
        this.router.navigateByUrl("/request-lines/" + this.requestSvc.currentRequest.id);
      },
      err => { console.log(err); }
    );
  }

  compLineItem(a: LineItem, b: LineItem): boolean {
    return a && b && a.id === b.id;
  }
}
