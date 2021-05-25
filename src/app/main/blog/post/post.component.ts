import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from './post.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;
  postUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
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
        },
        (error) => {
          console.log(error);
        });
  }

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

