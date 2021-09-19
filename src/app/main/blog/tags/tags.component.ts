import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from '../post/post.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  posts: Post[];
  tag: string;
  isLoading: boolean;
  private unsubscribe: Subject<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private location: Location,
    private titleService: Title,
  ) {
    this.unsubscribe = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (params: Params) => {
          this.tag = params.tag;
        }
      );
    this.findPostsByTag(this.tag);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  findPostsByTag(tag): void {
    this.titleService.setTitle('blyzniuk.dev | Tag: ' + tag);
    this.isLoading = true;
    this.tag = tag;
    this.location.replaceState('/blog/tag/' + tag);
    this.firestore.collection<Post>('posts', ref => ref.where('tags', 'array-contains', tag))
      .valueChanges()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (postsByTag: Post[]) => {
          this.posts = postsByTag;
          this.isLoading = false;
        }
      );
  }
}
