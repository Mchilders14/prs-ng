import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../user-maint-shared/user-maint.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  title: string = 'User-Edit';
  user: User = new User();
  submitBtnTitle: string = 'Edit';
  userId: number = 0;

  // When the page loads, onInit executed.
  constructor(
    private systemService: SystemService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(parms => this.userId = parms["id"]);
    this.userSvc.get(this.userId).subscribe(
      res => {
        this.user = res as User;
      },
      err => { console.log(err); }
    );
  }

  save() {
    this.userSvc.edit(this.user).subscribe(
      res => {
        this.user = res as User;
        this.router.navigateByUrl("/user-list");
      },
      err => { console.log(err); }
    );
  }
}
