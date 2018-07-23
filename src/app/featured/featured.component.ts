import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements AfterViewInit {

  constructor(private commonService: CommonService) { }

  ngAfterViewInit() {
    this.commonService.loadScript(
      // common
      'assets/layouts/layout2/scripts/layout.min.js',
      'assets/layouts/layout2/scripts/demo.min.js',
      'assets/layouts/global/scripts/quick-sidebar.min.js',
      'assets/layouts/global/scripts/quick-nav.min.js'

      // //datatable
      // 'assets/global/scripts/datatable.js',
      // 'assets/global/plugins/datatables/datatables.min.js',
      // 'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js',
      // 'assets/pages/scripts/table-datatables-managed.min.js'
    );
  }

}
