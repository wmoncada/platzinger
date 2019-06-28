import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.styl']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    // Obtengo el id del cliente por el parametro de la ruta
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.userService
      .getUserById(this.friendId)
      .valueChanges()
      .subscribe(
        (data: User) => {
          this.friend = data;
          console.log(this.friend);
        },
        (error) => {
          console.log(error);
        });
  }

  ngOnInit() {
  }

}
