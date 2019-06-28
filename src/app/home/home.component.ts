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
  query: string = '';

  constructor(private userService: UserService, private autenthicationService: AuthenticationService) {
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
