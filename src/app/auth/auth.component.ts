import { Component, OnDestroy, OnInit } from '@angular/core';

import firebase from 'firebase';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  email: string;
  password: string;
  loggedUser: firebase.User;
  private unsubscribe: Subject<any>;

  constructor(
    private authService: AuthService,
  ) {
    this.unsubscribe = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.authService.userSubject$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (user: firebase.User) => {
          this.loggedUser = user;
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  login(): void {
    this.authService.signInWithEmailAndPassword(this.email, this.password)
      .then(
        () => {
          this.loggedUser = this.authService.user;
        });
  }

  logout(): void {
    this.authService.sighOut()
      .then(
        () => {
          this.loggedUser = null;
        });
  }
}
