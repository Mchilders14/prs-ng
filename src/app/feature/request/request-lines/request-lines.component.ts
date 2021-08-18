import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { User } from 'src/app/model/user.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {

  title: string = "Purchase Request Line Items"
  request: Request = new Request();
  lineItem: LineItem = new LineItem();
  lineItems: LineItem[] = [];
  requestId: number = 0;
  saveUser: User = new User();

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private systemService: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {

    // Get the request
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      res => {
        this.request = res as Request;

        // set global request to current request
        this.requestSvc.currentRequest = this.request;
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

  delete(lineItemId: number) {
    this.lineItemSvc.delete(lineItemId).subscribe(
      res => {
        this.lineItem = res as LineItem;
        window.location.reload(); // reloads page
      },
      err => {
        console.log(err);
      }
    );
  }

  submit() {
    this.requestSvc.submitReview(this.request).subscribe(
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
