import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests: Request[] = [];

  constructor(private requestSvc: RequestService) { }

  ngOnInit(): void {
    this.requestSvc.list().subscribe(
      res => {
                this.requests = res as Request[]; 
                console.log("List of Requests: ", this.requests); 
              },
      err => { 
                console.log(err); 
              }
      );
  }
}
