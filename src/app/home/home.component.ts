import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  friends: User[];
  user: User;
  query: string = '';
  friendEmail: string = '';

  constructor(private userService: UserService, private autenthicationService: AuthenticationService, private modalService: NgbModal, private requestService: RequestsService) {
    // Obtengo los datos del usuario logueado
    this.autenthicationService
      .getStatus()
      .subscribe((status) => {
        this.userService
          .getUserById(status.uid)
          .valueChanges()
          .subscribe((data: User) => {
            this.user = data;
            console.log(data);
          }, (error) => {
            console.log(error);
          });
      }, (error) => {
        console.log(error);
      });
    // Obtiene la lista de usuarios
    userService
      .getUsers()
      .valueChanges()
      .subscribe(
          (data: User[]) => {
            this.friends = data;
          },
          (error) => {
            console.log(error);
        });
  }

  ngOnInit() {
  }

  logOut() {
    this.autenthicationService.logOut();
  }

  open(content) {
    this.modalService.open(content);
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };

    this.requestService.createRequest(request)
        .then(() => {
          alert('Solicitud enviada');
        })
        .catch((error) => {
          alert('ocurrio un error');
          console.log(error);
        });
  }
}
