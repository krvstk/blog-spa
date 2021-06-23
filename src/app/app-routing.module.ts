import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './main/about/about.component';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './main/contact/contact.component';
import { HomeComponent } from './main/home/home.component';
import { PagenotfoundComponent } from '@core/components/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'blog',
    loadChildren: () => import('./main/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
