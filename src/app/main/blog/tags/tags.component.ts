import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
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
    this.tag = tag;
    this.firestore.collection<Post>('posts', ref => ref.where('tags', 'array-contains', tag)).valueChanges()
      .subscribe(
        (postsByTag: Post[]) => {
          this.posts = postsByTag;
        }
      );
  }
}
