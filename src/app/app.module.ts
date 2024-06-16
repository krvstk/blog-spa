import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';
import { LayoutModule } from './layout/layout.module';
import { PagenotfoundModule } from '@core/components/pagenotfound/pagenotfound.module';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './main/home/home.component';
import { AngularFireModule, FIREBASE_OPTIONS } from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,

    MatIconModule,

    AngularFireModule.initializeApp(environment.firebase),

    AppRoutingModule,
    AuthModule,
    LayoutModule,
    PagenotfoundModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
