import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './main/about/about.component';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './main/contact/contact.component';
import { HomeComponent } from './main/home/home.component';
import { PagenotfoundComponent } from '@core/components/pagenotfound/pagenotfound.component';
import { PrivacyComponent } from './main/privacy/privacy.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'web developer'}
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {title: 'about'}
  },
  {
    path: 'auth',
    component: AuthComponent,
    data: {title: 'authentication'}
  },
  {
    path: 'blog',
    loadChildren: () => import('./main/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./main/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: {title: 'privacy'}
  },
  {
    path: '404',
    component: PagenotfoundComponent,
    data: {title: '404'}
  },
  {
    path: '**', pathMatch: 'full',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
