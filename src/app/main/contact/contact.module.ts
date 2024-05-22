import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FlexModule } from '@angular/flex-layout';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { ContactComponent } from './contact.component';


const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: {title: 'contact', animation: 'isRight'}
  },
];

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    FlexModule,

    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class ContactModule {
}
