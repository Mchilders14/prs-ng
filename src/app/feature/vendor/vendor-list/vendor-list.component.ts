import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  vendors: Vendor[] = [];

  constructor(
    private vendorSvc: VendorService,
    private systemService: SystemService
    ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();

    this.vendorSvc.list().subscribe(
      res => {
                this.vendors = res as Vendor[]; 
              },
      err => { 
                console.log(err); 
              }
      );
  }
}
