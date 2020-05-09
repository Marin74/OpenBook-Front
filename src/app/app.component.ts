import { Component } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // TODO Retirer Firebase à terme
    var firebaseConfig = {
      /*apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""*/

      apiKey: "AIzaSyAqGM6ue4m5H3FVOCV72YQKi__w-Itu7Lg",
      authDomain: "bookshelves-31c7a.firebaseapp.com",
      databaseURL: "https://bookshelves-31c7a.firebaseio.com",
      projectId: "bookshelves-31c7a",
      storageBucket: "bookshelves-31c7a.appspot.com",
      messagingSenderId: "37323982514",
      appId: "1:37323982514:web:b950dc538b899812286bab",
      measurementId: "G-SXT3Q9G3QV"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
