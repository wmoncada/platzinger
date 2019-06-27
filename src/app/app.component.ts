import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AngularFirestore } from "angularfire2/storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'platzinger';

  constructor(public router: Router){}
}
