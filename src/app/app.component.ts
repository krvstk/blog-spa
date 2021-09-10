import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isPhoneScreen: boolean;
  showBurger = true;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
    public breakpointObserver: BreakpointObserver,
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
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isPhoneScreen = state.matches;
      });
  }

  toggleMenu(): void {
    this.showBurger = !this.showBurger;
  }
}
