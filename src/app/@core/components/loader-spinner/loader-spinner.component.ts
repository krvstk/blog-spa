import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.spinner.show();
  }
}
