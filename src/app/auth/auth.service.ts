import { Injectable } from '@angular/core';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackBarService } from '@core/services/snack-bar.service';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User;
  // user$: Observable<UserCredential>;
  userSubject$: BehaviorSubject<firebase.User>;

  constructor(private router: Router,
              private auth: AngularFireAuth,
              private snackBarService: SnackBarService) {
    this.userSubject$ = new BehaviorSubject<firebase.User>(null);
    // this.auth.onAuthStateChanged(
    //   (user) => {
    //     if (user) {
    //       this.userSubject$.next(user);
    //     } else {
    //       this.userSubject$.next(null);
    //     }
    //   });
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<void | UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(
        (res: UserCredential) => {
          // this.user$ = from(new Promise<UserCredential>(resolve => resolve(res)));
          this.user = res.user;
          this.snackBarService.open('Login success!', 'OK',
            {
              duration: 5000,
              panelClass: ['snackbar-success']
            });
          this.router.navigate(['/blog']);
        })
      .catch(
        (error) => {
          this.snackBarService.open(error.message, null,
            {
              duration: 10000,
              panelClass: ['snackbar-error']
            });
        });
  }

  sighOut(): Promise<void> {
    return this.auth.signOut()
      .then(
        () => {
          this.snackBarService.open('Logout success!', 'OK',
            {
              duration: 5000,
              panelClass: ['snackbar-success']
            });
        });
  }
}
