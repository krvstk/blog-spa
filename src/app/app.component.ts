import { Component, HostListener } from '@angular/core';
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
  showBurger: boolean = true;
  topPosToStartShowing: number = 500;
  showUpButton: boolean;

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

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showUpButton = scrollPosition >= this.topPosToStartShowing;
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
