import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Post } from './post.model';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  loggedUser: firebase.User;
  post: Post;
  postUrl: string;
  private unsubscribe: Subject<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router,
  ) {
    this.unsubscribe = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.postUrl = params.postUrl;
        }
      );
    this.firestore.doc<Post>('posts/' + this.postUrl).valueChanges()
      .subscribe(
        (post: Post) => {
          this.post = post;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        });
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

  onDeletePost(): void {
    this.firestore.doc<Post>('posts/' + this.post.url).delete()
      .then(
        () => {
          this.router.navigate(['/blog']);
        }
      );
  }

  onEditPost(): void {
    this.router.navigate(['/blog/post', this.post.url, 'edit'], {state: this.post});
  }
}

