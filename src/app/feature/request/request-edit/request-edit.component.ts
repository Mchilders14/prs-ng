import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  title: string = "Request-Edit";
  request: Request = new Request();
  submitBtnTitle: string = 'Edit';
  requestId: number = 0;
  
  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    // get the credit to edit
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      res => {
        this.request = res as Request;
      },
      err => { console.log(err); }
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

  compVendor(a: Request, b: Request): boolean {
    return a && b && a.id === b.id;
  }
}
