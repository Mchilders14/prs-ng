import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.class';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  
  // Aug 2021 - recent Angular / TS update disallows assignment
  // of null to component property, so initializing as new User
  loggedInUser: User = new User();

  constructor(private router: Router) { }

  // not applicable for bmdb-ng as there is no 'admin' property on user
  // isAdmin(): boolean {
  //   return (this.loggedInUser == null) ? false : this.loggedInUser.admin;
  // }

  checkLogin(): void {
    // if user is not logged in, send to login page.
    // Aug 2021 - if user is logged in the loggedInUser.id
    // should be > 0
    // comment out this code for testing purposes
    if (this.loggedInUser.id == 0) {
      console.log("User is not logged in... redirecting to login.");
      this.router.navigateByUrl("/user-login");
    }
  }
}
