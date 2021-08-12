import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  title: string = "Request-Create";
  request: Request = new Request();
  user: User = new User();
  submitBtnTitle: string = 'Create';

  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("User List, checking loggedInUser in sysSvc:  ", this.systemSvc.loggedInUser);
    this.user = this.systemSvc.loggedInUser;
    this.request.user = this.user;
  }

  save() {
    this.requestSvc.create(this.request).subscribe(
      res => {
        this.request = res as Request;
        this.router.navigateByUrl("/request-list");
      },
      err => { console.log(err); }
    );
  }
}
