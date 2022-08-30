import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisneyCharactersService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  disneyCharacters(params={}) {
    return this.httpClient.get('https://api.disneyapi.dev/characters/', {params});
  }

  getCharacter(id:number) {
    return this.httpClient.get('https://api.disneyapi.dev/characters/'+id);
  }

}
