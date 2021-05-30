import { Component, OnDestroy, OnInit } from '@angular/core';

import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Post } from './post/post.model';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  loggedUser: firebase.User;
  posts$: Observable<Post[]>;
  private unsubscribe: Subject<any>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) {
    this.unsubscribe = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.posts$ = this.firestore.collection<Post>('posts').valueChanges();
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
}
