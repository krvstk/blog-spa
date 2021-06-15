import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import * as CustomEditor from 'src/assets/ckeditor/ckeditor';

import { AuthService } from '../../../../auth/auth.service';
import { BlogService } from '../../blog.service';
import { BlogUtils } from '@core/utils';
import { Post } from '../post.model';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {

  form: FormGroup;
  post: Post;
  public Editor = CustomEditor;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router,
  ) {
    this.post = new Post(this.router.getCurrentNavigation().extras.state);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.form = this.fb.group({
      author: this.post.author,
      title: this.post.title,
      description: this.post.description,
      content: this.post.content,
      url: this.post.url,
      tags: [this.post.tags],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  createPost(): void {
    this.form.value.tags = this.form.value.tags ? this.form.value.tags.split(',') : null;
    this.form.value.dateCreated = new Date();
    this.firestore.collection('posts').doc<Post>(this.form.value.url).set(this.form.value)
      .then(
        () => {
          this.router.navigate(['/blog/post/' + this.form.value.url]);
        })
      .catch(
        (error) => {
          console.log(error);
        });
  }

  editPost(): void {
    const changedValues = BlogUtils.getChangedFields(this.form);
    changedValues['dateEdited'] = new Date();
    changedValues['tags'] = changedValues['tags'] ? changedValues['tags'].split(',') : this.form.value.tags;
    this.firestore.doc<Post>('posts/' + this.post.url).update(changedValues)
      .then(
        () => {
          this.router.navigate(['/blog/post/' + this.form.value.url]);
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }
}
