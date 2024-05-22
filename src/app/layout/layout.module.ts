import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from '../app-routing.module';
import { ContentSectionComponent } from './content-section/content-section.component';
import { FooterComponent } from './footer/footer.component';
import { TopButtonComponent } from './top-button/top-button.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';


@NgModule({
  declarations: [
    ContentSectionComponent,
    FooterComponent,
    TopButtonComponent,
  ],
  exports: [
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
    MatTooltipModule,

    AppRoutingModule,
  ]
})
export class LayoutModule {
}
