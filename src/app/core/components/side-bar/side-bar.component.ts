import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { FunctionService } from 'app/featured/authorization/shared/function.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  functions: any[] = [];
  subscription: Subscription;

  constructor(
    private functionService: FunctionService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.subscription = this.functionService.getAll()
      .subscribe((functions:any) => {
          this.functions = this.commonService.unflatten(functions);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
