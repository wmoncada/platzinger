import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  friends: User[];

  constructor() {
    let myUser: User = {
      nick: "Walberto",
      subnick: 'hello',
      age: 31,
      email: "asdq@mail.com",
      friend: true,
      uid: 1
    };

    let user1: User = {
      nick: "Juan",
      email: "aes@aes.ase",
      friend: true,
      uid: 2
    };

    let user2: User = {
      nick: "Pedro",
      email: "aes@aes.ase",
      friend: true,
      uid: 3
    };

    let user3: User = {
      nick: "Pablo",
      email: "aes@aes.ase",
      friend: true,
      uid: 4
    };

    let users: User[] = { myUser };
    this.friends = [user1, user2, user3];

    console.log(myUser); 
    console.log(users); 
    console.log(this.friends);
   }

  ngOnInit() {
  }

}
