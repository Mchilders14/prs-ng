import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor(
    private systemService: SystemService
  ) { }

  ngOnInit(): void {

    let loginString = (this.systemService.loggedInUser.id == 0)? "Login" : "Logout";

    this.menuItems = [
    new MenuItem("User", "/user-list", "User List"),
    new MenuItem("Vendor", "/vendor-list", "Vendor List"),
    new MenuItem("Product", "/product-list", "Product List"),
    new MenuItem("Request", "/request-list", "Request List"),
    new MenuItem(loginString, "/user-login", "User Login/Logout")
    ];

    if (this.systemService.loggedInUser.reviewer == true){
      this.menuItems.push(new MenuItem("Review", "/request-review", "Review Requests"))
    }

  }
}
