import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from '../post/post.model';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  posts: Post[];
  tag: string;
  isLoading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private location: Location,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.tag = params.tag;
        }
      );
    this.findPostsByTag(this.tag);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  findPostsByTag(tag): void {
    this.isLoading = true;
    this.tag = tag;
    this.location.replaceState('/blog/tag/' + tag);
    this.firestore.collection<Post>('posts', ref => ref.where('tags', 'array-contains', tag)).valueChanges()
      .subscribe(
        (postsByTag: Post[]) => {
          this.posts = postsByTag;
          this.isLoading = false;
        }
      );
  }
}
