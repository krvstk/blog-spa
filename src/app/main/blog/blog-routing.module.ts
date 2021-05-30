import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { PostFormComponent } from './post/post-form/post-form.component';
import { TagsComponent } from './tags/tags.component';


const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: 'post/create',
    component: PostFormComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'post/:postUrl',
    component: PostComponent,
  },
  {
    path: 'post/:postUrl/edit',
    component: PostFormComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'tag/:tagUrl',
    component: TagsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogRoutingModule {
}
