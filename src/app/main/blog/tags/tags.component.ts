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
  tagUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.tagUrl = params.tagUrl;
        }
      );
    this.firestore.collection<Post>('posts', ref => ref.where('tags', 'array-contains', this.tagUrl)).valueChanges()
      .subscribe(
        (postsByTag: Post[]) => {
          this.posts = postsByTag;
        }
      );
  }
}
