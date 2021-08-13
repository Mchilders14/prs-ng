import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {

  title: string = "Purchase Request Line Items"
  request: Request = new Request();
  lineItems: LineItem[] = [];
  requestId: number = 0;

  constructor(
    private requestSvc: RequestService,
    private lineItemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
                console.log("List of LineItems: ", this.lineItems); 
              },
      err => { 
                console.log(err); 
              }
      );
  }

  save() {
    this.requestSvc.edit(this.request).subscribe(
      res => {
        this.request = res as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => { console.log(err); }
    );
  }
}