import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SnackBarService } from '@core/services/snack-bar.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  userSubject$: BehaviorSubject<any>;

  constructor(private router: Router,
              private auth: AngularFireAuth,
              private snackBarService: SnackBarService,
  ) {
    this.userSubject$ = new BehaviorSubject<any>(null);
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<void | any> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(
        (res: any) => {
          this.user = res.user;
          this.snackBarService.open('Login success!', 'OK', 'SUCCESS');
          this.router.navigate(['/blog']);
        })
      .catch(
        (error: Error) => {
          this.snackBarService.open(error.message, 'OK', 'FAIL');
        });
  }

  sighOut(): Promise<void> {
    return this.auth.signOut()
      .then(
        () => {
          this.snackBarService.open('Logout success!', 'OK','SUCCESS');
        });
  }
}
