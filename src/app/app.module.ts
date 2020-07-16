import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupportComponent } from './support/support.component';
import {ReactiveFormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDVBzGLwfLO02C0mkIu0st7HgKxrsRuV6w',
  authDomain: 'real-estate-d8b23.firebaseapp.com',
  databaseURL: 'https://real-estate-d8b23.firebaseio.com',
  projectId: 'real-estate-d8b23',
  storageBucket: 'real-estate-d8b23.appspot.com',
  messagingSenderId: '646013818333',
  appId: '1:646013818333:web:c7391bd095268996465234'
};

@NgModule({
  declarations: [AppComponent, SupportComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireStorageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
