import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from './post/post.model';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.posts$ = this.firestore.collection<Post>('posts').valueChanges();
  }
}
