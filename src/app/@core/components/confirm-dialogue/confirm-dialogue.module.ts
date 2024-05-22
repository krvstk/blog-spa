import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogueComponent } from './confirm-dialogue.component';

import { FlexModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    ConfirmDialogueComponent
  ],
  imports: [
    CommonModule,

    FlexModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
  ]
})
export class ConfirmDialogueModule {
}
