import { Component, OnDestroy, OnInit } from '@angular/core';

import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
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
  posts: Post[];
  isLoading: boolean;
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
    this.isLoading = true;
    this.firestore.collection<Post>('posts').valueChanges()
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        }
      );
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
