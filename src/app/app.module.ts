import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';
import { LayoutModule } from './layout/layout.module';
import { PagenotfoundModule } from '@core/components/pagenotfound/pagenotfound.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AngularFireModule.initializeApp(environment.firebase),

    AppRoutingModule,
    AuthModule,
    LayoutModule,
    PagenotfoundModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
