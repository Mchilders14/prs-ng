import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  title: string = 'User-Detail';
  user: User = new User();
  userId: number = 0;

  constructor(
    private userSvc: UserService,
    private systemService: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();
    
    this.route.params.subscribe(parms => this.userId = parms["id"]);
    this.userSvc.get(this.userId).subscribe(
      res => {
        this.user = res as User;
      },
      err => { console.log(err); }
    );
  }

  delete() {
    this.userSvc.delete(this.userId).subscribe(
      res => {
        this.user = res as User;
        this.router.navigateByUrl('/user-list');
      },
      err => {
        console.log(err);
      }
    );

  }
}
