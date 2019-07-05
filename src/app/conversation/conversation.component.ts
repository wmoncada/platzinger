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
  convertation: any[];
  shake: boolean = false;

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
              console.log(this.convertationId);

              this.getConversation();
            },
            (error) => {
              console.log(error);
            });
          });
        });
      }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.convertationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      seen: false,
      type: 'text'
    };

    this.convertationService
      .createConversation(message)
      .then(() => {
        this.textMessage = '';
      });
  }

  sendZumbido() {
    const message = {
      uid: this.convertationId,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      seen: false,
      type: 'zumbido'
    };

    this.convertationService
      .createConversation(message)
      .then(() => {
        this.doZumbido();
      });
  }

  getConversation() {
    this.convertationService
      .getConvertation(this.convertationId)
      .valueChanges()
      .subscribe((data) => {
        console.log(data);
        this.convertation = data;
        this.convertation.forEach((msj) => {
          if (!msj.seen) {
            msj.seen = true;
            this.convertationService.editConversation(msj);
            if(msj.type === 'text') {
              // Reproduce el sonido de notificacion
              const audio = new Audio('assets/sound/new_message.m4a');
              audio.play();
            } else if(msj.type === 'zumbido') {
              this.doZumbido();
            }
          }
        });
      }, (error) => {
        console.log(error);
      });
  }

  getUserNickById(uid) {
    if (uid === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }
}
