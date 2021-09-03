import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD83loPdRIt4CNxrmhUPapZ8P9BGBvt55E",
  authDomain: "zackapp-10ae1.firebaseapp.com",
  databaseURL: "https://zackapp-10ae1.firebaseio.com",
  projectId: "zackapp-10ae1",
  storageBucket: "zackapp-10ae1.appspot.com",
  messagingSenderId: "653209157174",
  appId: "1:653209157174:web:6a29ccf06ffffdf3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
