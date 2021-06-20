import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    LoaderSpinnerComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ],
  exports: [
    NgxSpinnerModule,
    LoaderSpinnerComponent,
  ]
})
export class LoaderSpinnerModule {
}
