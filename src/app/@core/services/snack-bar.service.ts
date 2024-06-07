import { Injectable } from '@angular/core';

import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  open(message: string, action?: string, configCase?: string): MatSnackBarRef<TextOnlySnackBar> {
    let config: MatSnackBarConfig = {};
    switch (configCase) {
      case 'SUCCESS':
        config = {
          duration: 5000,
          panelClass: ['snackbar-success']
        };
        break;
      case 'FAIL':
        config = {
          duration: 10000,
          panelClass: ['snackbar-error']
        };
        break;
    }
    return this.snackBar.open(message, action, config);
  }
}
