import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
    new MenuItem("User", "/user-list", "Movie List"),
    new MenuItem("Vendor", "/vendor-list", "Actor List"),
    new MenuItem("Product", "/product-list", "Credit List"),
    new MenuItem("Request", "/request-list", "User List"),
    new MenuItem("Review", "/line-item-list", "Movie Collection List"),
    new MenuItem("Login", "/user-login", "User Login")
    ];
  }
}
