import { Component, OnDestroy, OnInit } from '@angular/core';

import firebase from 'firebase';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { QueryDocumentSnapshot } from '@angular/fire/firestore/interfaces';
import { Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import { Post } from './post/post.model';
import { SnackBarService } from '@core/services/snack-bar.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  firstSnapshot: QueryDocumentSnapshot<Post>;
  firstSnapshotsPerPage = new Map();
  isLoading: boolean;
  lastSnapshot: QueryDocumentSnapshot<Post>;
  loggedUser: firebase.User;
  nextPageButtonDisabled: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  posts: Post[] = [];
  private unsubscribe: Subject<any>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private snackbarService: SnackBarService,
  ) {
    this.unsubscribe = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.isLoading = true;
    this.firestore.collection<Post>
    ('posts', ref => ref
      .orderBy('dateCreated', 'desc')
      .limit(this.pageSize)
    )
      .snapshotChanges()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: DocumentChangeAction<Post>[]) => {
          this.loadNewPage(response);
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

  onNextPage(): void {
    this.isLoading = true;
    this.firestore.collection<Post>
    ('posts', ref => ref
      .orderBy('dateCreated', 'desc')
      .startAfter(this.lastSnapshot)
      .limit(this.pageSize)
    )
      .snapshotChanges()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: DocumentChangeAction<Post>[]) => {
          if (response.length > 0) {
            if (response.length < this.pageSize) {
              this.nextPageButtonDisabled = true;
            }
            this.pageNumber++;
            this.loadNewPage(response);
          } else {
            this.snackbarService.open('Sorry, it was the last page!', 'OK', 'SUCCESS');
            this.isLoading = false;
            this.nextPageButtonDisabled = true;
          }
        });
  }

  onPreviousPage(): void {
    this.isLoading = true;
    this.nextPageButtonDisabled = false;
    this.firestore.collection<Post>
    ('posts', ref => ref
      .orderBy('dateCreated', 'desc')
      .startAt(this.firstSnapshotsPerPage.get(this.pageNumber - 1))
      .endBefore(this.firstSnapshot)
      .limit(this.pageSize)
    )
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(
        (response: DocumentChangeAction<Post>[]) => {
          this.pageNumber--;
          this.loadNewPage(response);
        });
  }

  loadNewPage(response: DocumentChangeAction<Post>[]): void {
    this.posts = [];
    this.firstSnapshot = response[0].payload.doc;
    this.lastSnapshot = response[response.length - 1].payload.doc;
    this.firstSnapshotsPerPage.set(this.pageNumber, this.firstSnapshot);
    response.map(item => {
      this.posts.push(item.payload.doc.data());
    });
  }
}
