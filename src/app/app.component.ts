import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { filter, map, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('scrollPosition', [
      state('on', style({
        backgroundColor: '#becee5'
      })),
      state('off', style({
        background: 'transparent'
      })),
      transition('on => off', animate('500ms ease-out')),
      transition('off => on', animate('500ms ease-in'))
    ])
  ]
})

export class AppComponent {
  isPhoneScreen: boolean;
  topPosToStartShowing: number = 500;
  showUpButton: boolean = false;
  scrollPosition: number = 0;
  showBurger: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
    public breakpointObserver: BreakpointObserver,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    let baseTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route: any) => route.outlet === "primary"),
        mergeMap((route: any) => route.data),
        map((data: any) => {
          if (data.title) {
            return " | " + data.title;
          } else {
            return "";
          }
        })
      )
      .subscribe(pathString => this.titleService.setTitle(baseTitle + pathString));
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  @HostListener('window:scroll')
  checkScroll() {
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showUpButton = this.scrollPosition >= this.topPosToStartShowing;
  }

  toggleMenu(): void {
    this.showBurger = !this.showBurger;
  }
}
