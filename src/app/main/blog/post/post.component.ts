import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../auth/auth.service';
import { ConfirmDialogueComponent } from '@core/components/confirm-dialogue/confirm-dialogue.component';
import { Post } from './post.model';
import { SnackBarService } from '@core/services/snack-bar.service';


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
    public matDialog: MatDialog,
    private snackbarService: SnackBarService
  ) {
    this.unsubscribe = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (params: Params) => {
          this.postUrl = params.postUrl;
        }
      );
    this.firestore.doc<Post>('posts/' + this.postUrl).valueChanges()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (post: Post) => {
          this.post = post;
        },
        (error) => {
          this.snackbarService.open(error, 'OK', 'FAIL');
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

  onDeletePost(postTitle = null): void {
    const confirmDialogRef = this.matDialog.open(ConfirmDialogueComponent, {
      width: '25%',
      minWidth: '250px',
      minHeight: '250px'
    });

    confirmDialogRef.componentInstance.confirmMessage = `Do you want to delete post ${postTitle}?`;

    confirmDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.firestore.doc<Post>('posts/' + this.post.url).delete()
          .then(
            () => {
              this.snackbarService.open(`${postTitle} deleted!`, 'OK', 'SUCCESS');
              this.router.navigate(['/blog']);
            })
          .catch((error) => {
            this.snackbarService.open(error, 'OK', 'FAIL');
          });
      }
    });
  }

  onEditPost(): void {
    this.router.navigate(['/blog/post', this.post.url, 'edit'], {state: this.post});
  }
}

