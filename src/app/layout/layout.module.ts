import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ContentSectionComponent } from './content-section/content-section.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TopButtonComponent } from './top-button/top-button.component';


@NgModule({
  declarations: [
    ContentSectionComponent,
    HeaderComponent,
    FooterComponent,
    TopButtonComponent,
  ],
  exports: [
    HeaderComponent,
    ContentSectionComponent,
    TopButtonComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,

    FlexModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class LayoutModule {
}
