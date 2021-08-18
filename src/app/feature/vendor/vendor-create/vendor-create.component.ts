import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: '../vendor-maint-shared/vendor-maint.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  title: string = 'Vendor-Create';
  vendor: Vendor = new Vendor();
  submitBtnTitle: string = 'Create';

  constructor(
    private systemService: SystemService,
    private vendorSvc: VendorService,
    private router: Router
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();
  }

  save() {
    this.vendorSvc.create(this.vendor).subscribe(
      res => {
        this.vendor = res as Vendor;
        this.router.navigateByUrl("/vendor-list");
      },
      err => { console.log(err); }
    );
  }
}
