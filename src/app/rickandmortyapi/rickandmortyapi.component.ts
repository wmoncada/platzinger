import { Component, OnInit } from '@angular/core';
import { RickandmortyService } from '../services/rickandmorty.service';
import { Character } from '../interfaces/rickandmortycharacter';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rickandmortyapi',
  templateUrl: './rickandmortyapi.component.html',
  styleUrls: ['./rickandmortyapi.component.styl']
})
export class RickandmortyapiComponent implements OnInit {
  characters: Character[];

  constructor(private api: RickandmortyService, private authenticationService: AuthenticationService, private router: Router) {
    this.api
      .get()
      .subscribe((data) => {
        console.log(data);
        // this.characters = data;
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

  getCharacters() {
    return this.api.get();
  }

}
