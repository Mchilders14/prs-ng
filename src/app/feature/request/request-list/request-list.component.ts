import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests: Request[] = [];

  constructor(
    private requestSvc: RequestService,
    private systemService: SystemService
    ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();

    this.requestSvc.list().subscribe(
      res => {
                this.requests = res as Request[]; 
              },
      err => { 
                console.log(err); 
              }
      );
  }
}
