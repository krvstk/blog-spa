import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexModule } from '@angular/flex-layout';

import { PagenotfoundComponent } from '@core/components/pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    PagenotfoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    FlexModule,
  ]
})
export class PagenotfoundModule {
}
