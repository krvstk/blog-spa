import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from 'ngx-quill';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogService } from './blog.service';
import { ConfirmDialogueModule } from '@core/components/confirm-dialogue/confirm-dialogue.module';
import { LoaderSpinnerModule } from '@core/components/loader-spinner/loader-spinner.module';
import { PostComponent } from './post/post.component';
import { PostFormComponent } from './post/post-form/post-form.component';
import { SharedModule } from '../../shared/shared.module';
import { TagsComponent } from './tags/tags.component';
import { environment } from '../../../environments/environment';


@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    PostFormComponent,
    TagsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AngularFireAnalyticsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    FlexModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    QuillModule.forRoot(),

    BlogRoutingModule,
    ConfirmDialogueModule,
    LoaderSpinnerModule,
    SharedModule,
  ],
  providers: [
    BlogService,
  ]
})
export class BlogModule {
}
