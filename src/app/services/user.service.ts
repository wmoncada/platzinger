import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[];
  friend: User;

  constructor() {
    let user1: User = {
      nick: "Juan",
      email: "aes@aes.ase",
      friend: true,
      uid: 1
    };

    let user2: User = {
      nick: "Pedro",
      email: "aes@aes.ase",
      friend: true,
      uid: 2
    };

    let user3: User = {
      nick: "Pablo",
      email: "aes@aes.ase",
      friend: false,
      uid: 3
    };

    let user4: User = {
      nick: "Vilma",
      email: "aes@aes.ase",
      friend: false,
      uid: 4
    };

    let user5: User = {
      nick: "Betty",
      email: "aes@aes.ase",
      friend: false,
      uid: 5
    };


    this.friends = [user1, user2, user3, user4, user5];
  }

  getFriends() {
    return this.friends;
  }

  getFriendByUid(uid: any) {
    this.friend = this.friends.find((record) => {
      return record.uid == uid;
    });
    
    return this.friend;
  }
}
