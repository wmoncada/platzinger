import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { RecursiveVisitor } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.styl']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  convertationId: string;
  textMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,private convertationService: ConversationService, private authenticationService: AuthenticationService) {
    // Obtengo el id del cliente por el parametro de la ruta
    this.friendId = this.activatedRoute.snapshot.params['uid'];

    this.authenticationService
    .getStatus()
    .subscribe((session) => {
      this.userService
      .getUserById(session.uid)
      .valueChanges()
      .subscribe((usr: User) => {
        this.user = usr;
        // Obtengo los datos del amigo
        this.userService
          .getUserById(this.friendId)
          .valueChanges()
          .subscribe(
            (data: User) => {
              this.friend = data;
              console.log(this.friend);

              const ids = [this.user.uid, this.friend.uid].sort();
              this.convertationId = ids.join('|');
            },
            (error) => {
              console.log(error);
            });
                  });
            });
  }

  ngOnInit() {
  }

  sendMessage(){
    const message = {
      uid: this.convertationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };

    this.convertationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }
}
