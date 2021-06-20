import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from './auth/auth.service';
import firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.angularFireAuth.onAuthStateChanged(
      (user: firebase.User) => {
        if (user) {
          this.authService.userSubject$.next(user);
        } else {
          this.authService.userSubject$.next(null);
        }
      });
  }
}
