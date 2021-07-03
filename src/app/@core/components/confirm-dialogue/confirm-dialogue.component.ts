import { Component, ViewEncapsulation } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogueComponent {
  public confirmMessage: string;

  constructor(
    public matDialogRef: MatDialogRef<ConfirmDialogueComponent>
  ) {
  }
}
