import { Component, OnDestroy, OnInit } from '@angular/core';

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
  loggedUser: any;
  showLoginForm: boolean = true;
  private unsubscribe: Subject<void>;

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
        (user: any) => {
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
          this.showLoginForm = false;
        });
  }

  logout(): void {
    this.authService.sighOut()
      .then(
        () => {
          this.loggedUser = null;
          this.showLoginForm = true;
        });
  }
}
