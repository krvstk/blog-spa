import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogueComponent } from './confirm-dialogue.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    ConfirmDialogueComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
  ]
})
export class ConfirmDialogueModule {
}
