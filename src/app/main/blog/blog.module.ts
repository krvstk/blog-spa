import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogService } from './blog.service';
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
    AngularFirestoreModule,
    FlexModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    BlogRoutingModule,
    SharedModule,
  ],
  providers: [
    BlogService,
  ]
})
export class BlogModule {
}
