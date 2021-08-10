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
    new MenuItem("User", "/movie-list", "Movie List"),
    new MenuItem("Vendor", "/actor-list", "Actor List"),
    new MenuItem("Product", "/credit-list", "Credit List"),
    new MenuItem("Request", "/user-list", "User List"),
    new MenuItem("Review", "/movie-collection-list", "Movie Collection List"),
    new MenuItem("Login", "/movie-collection-list", "Movie Collection List")
    ];
  }

}
