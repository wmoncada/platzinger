import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Character } from '../interfaces/rickandmortycharacter';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  API_END_POINT = 'https://rickandmortyapi.com/api/';

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(this.API_END_POINT + '/character/');
  }

}
