import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {

  requests: Request[] = [];

  constructor(
    private requestSvc: RequestService,
    private systemService: SystemService
    ) { }

  ngOnInit(): void {
    this.requestSvc.listReview(this.systemService.loggedInUser.id).subscribe(
      res => {
                this.requests = res as Request[]; 
              },
      err => { 
                console.log(err); 
              }
      );
  }
}
