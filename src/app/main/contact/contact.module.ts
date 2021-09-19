import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FlexModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ContactComponent } from './contact.component';


const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: {title: 'Contact'}
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
