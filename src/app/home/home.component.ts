import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';

  constructor(private userService: UserService) {
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

}
