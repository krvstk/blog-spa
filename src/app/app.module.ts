import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';
import { PagenotfoundComponent } from '@core/components/pagenotfound/pagenotfound.component';
import { LayoutModule } from './layout/layout.module';


@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,

    AngularFireModule.initializeApp(environment.firebase),

    AppRoutingModule,
    AuthModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
