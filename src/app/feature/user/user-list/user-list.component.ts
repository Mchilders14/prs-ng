import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.userSvc.list().subscribe(
      res => {
                this.users = res as User[]; 
                console.log("List of Users: ", this.users); 
              },
      err => { 
                console.log(err); 
              }
      );
  }
}
