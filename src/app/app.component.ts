import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipe-book';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCstlNl1FNDXtz7mrCWbO-6nGj7Vu4moCc",
      authDomain: "recipe-book-ms.firebaseapp.com"
    });
  }
}
