import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  friends: User[];
  user: User;
  query: string = '';

  constructor(private userService: UserService, private autenthicationService: AuthenticationService) {
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
}
