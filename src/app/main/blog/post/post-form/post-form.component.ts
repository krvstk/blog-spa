import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { QuillEditorComponent } from 'ngx-quill';

import { AuthService } from '../../../../auth/auth.service';
import { BlogService } from '../../blog.service';
import { BlogUtils } from '@core/utils';
import { Post } from '../post.model';
import { SnackBarService } from '@core/services/snack-bar.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {

  selectFileEventTarget: HTMLInputElement;
  form: UntypedFormGroup;
  post: Post;
  updatedImageUrl: string;
  parsedImage: string | ArrayBuffer;
  @ViewChild('editor', { static: true}) editor: QuillEditorComponent

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private fb: UntypedFormBuilder,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private router: Router,
    private snackBarService: SnackBarService,
  ) {
    this.post = new Post(this.router.getCurrentNavigation().extras.state);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.form = this.fb.group({
      author: this.post.author || 'Blyzniuk Yevhen',
      title: this.post.title,
      description: this.post.description,
      content: this.post.content,
      url: this.post.url,
      tags: [this.post.tags],
    },
      {validator: [Validators.required]});
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
          this.snackBarService.open(`Post ${this.form.value.title} created`, 'OK', 'SUCCESS');
          this.router.navigate(['/blog/post/' + this.form.value.url]);
        })
      .catch(
        (error: Error) => {
          this.snackBarService.open(error.message, 'OK', 'FAIL');
        });
  }

  editPost(): void {
    const changedValues = BlogUtils.getChangedFields(this.form);
    changedValues['dateEdited'] = new Date();
    changedValues['tags'] = changedValues['tags'] ? changedValues['tags'].split(',') : this.form.value.tags;
    changedValues['imageUrl'] = this.updatedImageUrl ?? this.post.imageUrl;
    this.firestore.doc<Post>('posts/' + this.post.url).update(changedValues)
      .then(
        () => {
          this.snackBarService.open(`Post ${this.post.title} edited`, 'OK', 'SUCCESS');
          this.router.navigate(['/blog/post/' + this.form.value.url]);
        }
      )
      .catch(
        (error: Error) => {
          this.snackBarService.open(error.message, 'OK', 'FAIL');
        }
      );
  }

  async uploadDescriptionImage(): Promise<void> {
    const uploadSnap = await this.fireStorage.upload(
      this.selectFileEventTarget.files[0].name,
      this.selectFileEventTarget.files[0]
    );
    await uploadSnap.ref.getDownloadURL()
      .then(
        (uploadedImageUrl: string) => {
          this.form.value.imageUrl = this.updatedImageUrl = uploadedImageUrl;
          this.snackBarService.open('Successfully uploaded!', 'OK', 'SUCCESS');
        })
      .catch(
        (error: Error) => {
          this.snackBarService.open(error.message, 'OK', 'FAIL');
        });
  }

  parseImage($event: Event): void {
    this.selectFileEventTarget = $event.target as HTMLInputElement;
    if (this.selectFileEventTarget.files && this.selectFileEventTarget.files[0]) {
      const file = this.selectFileEventTarget.files[0];
      const reader = new FileReader();
      reader.onload = () => this.parsedImage = reader.result;
      reader.readAsDataURL(file);
    }
  }
}
