import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, isNotAnonymous } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { PostFormComponent } from './post/post-form/post-form.component';
import { TagsComponent } from './tags/tags.component';


export const redirectAnonymousTo = (redirect: any[]) =>
  pipe(isNotAnonymous, map(loggedIn => loggedIn || redirect)
  );

const redirectUnauthorizedToLogin = () => redirectAnonymousTo(['404']);

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: {title: 'blog'}
  },
  {
    path: 'post/create',
    component: PostFormComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin, title: 'create post' }
  },
  {
    path: 'post/:postUrl',
    component: PostComponent,
  },
  {
    path: 'post/:postUrl/edit',
    component: PostFormComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin, title: 'edit post'  }
  },
  {
    path: 'tag/:tag',
    component: TagsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogRoutingModule {
}
