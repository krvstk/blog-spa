import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post/post.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  posts: Post[];
  post: Post;

  constructor(private http: HttpClient,
              private firestore: AngularFirestore) {
  }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
  //   if (this.posts) {
  //     return Promise.resolve(this.posts);
  //   }
  //
  //   return this.getPosts();
  // }

  // getPosts(): Observable<Post[]> {
  //   return this.http.get('/api/get-posts')
  //     .pipe(
  //       map(rawPost => {
  //         const postsArray = [];
  //         for (const key in rawPost) {
  //           if (Object.prototype.hasOwnProperty.call(rawPost, key)) {
  //             postsArray.push({...rawPost[key], id: key});
  //           }
  //         }
  //         return postsArray;
  //       }),
  //       tap((postsArray: Post[]) => {
  //           this.posts = postsArray;
  //         }
  //       )
  //     );
  // }

  // getPosts(): Observable<Post[]> {
  //   return this.firestore.collection<Post>('posts').valueChanges()
  //     .pipe(
  //       tap((postsArray: Post[]) => {
  //         this.posts = postsArray;
  //       })
  //     );
  // }
}
