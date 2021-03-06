import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {

  title: string = "[Purchase Request Approve/Reject]"
  request: Request = new Request();
  lineItem: LineItem = new LineItem();
  lineItems: LineItem[] = [];
  requestId: number = 0;

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private systemService: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();

    // Get the request
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    
    this.requestSvc.get(this.requestId).subscribe(
      res => {
        this.request = res as Request;
      },
      err => { console.log(err); }
    );

    this.lineItemSvc.getRequestLines(this.requestId).subscribe(
      res => {
        this.lineItems = res as LineItem[]; 
              },
      err => { 
        console.log(err); 
              }
      );
  }

  approve(){
    this.requestSvc.approve(this.request).subscribe(
      res => {
        this.request = res as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => {
        console.log(err);
      }
    );
  }

  reject(){
    this.requestSvc.reject(this.request).subscribe(
      res => {
        this.request = res as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => {
        console.log(err);
      }
    );
  }
}
