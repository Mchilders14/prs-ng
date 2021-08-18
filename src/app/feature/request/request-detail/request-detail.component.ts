import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  title: string = 'Request-Detail';
  request: Request = new Request();
  requestId: number = 0;

  constructor(
    private requestSvc: RequestService,
    private systemService: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();
    
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      res => {
        this.request = res as Request;
      },
      err => { console.log(err); }
    );
  }

  delete() {
    this.requestSvc.delete(this.requestId).subscribe(
      res => {
        this.request = res as Request;
        this.router.navigateByUrl('/request-list');
      },
      err => {
        console.log(err);
      }
    );
  }
}
