import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  title: string = 'Vendor-Detail';
  vendor: Vendor = new Vendor();
  vendorId: number = 0;

  constructor(
    private systemService: SystemService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // When the page loads, onInit executed.
  ngOnInit(): void {
    this.systemService.checkLogin();
    
    this.route.params.subscribe(parms => this.vendorId = parms["id"]);
    this.vendorSvc.get(this.vendorId).subscribe(
      res => {
        this.vendor = res as Vendor;
      },
      err => { console.log(err); }
    );
  }

  delete() {
    this.vendorSvc.delete(this.vendorId).subscribe(
      res => {
        this.vendor = res as Vendor;
        this.router.navigateByUrl('/vendor-list');
      },
      err => {
        console.log(err);
      }
    );
  }
}
