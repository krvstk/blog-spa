import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

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
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";


@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    PostFormComponent,
    TagsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    AngularFireAnalyticsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
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
