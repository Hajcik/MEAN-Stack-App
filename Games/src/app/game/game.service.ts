import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  readonly url = "http://localhost:5000/games/"

  constructor(private http: HttpClient) { 
  }

  GET_Games() : Observable<any>{
    return this.http.get(this.url)
  }

  GET_Game(id:any) : Observable<any> {
    return this.http.get(this.url + id)
  }

  POST_Game(game:Game) : Observable<any> {
    return this.http.post(this.url, game)
  }

  PUT_Game(id:any, game:Game) : Observable<any> {
    return this.http.put(`${this.url}/${id}`, game)
  }

  DELETE_Game(id:any) : Observable<any> {
    return this.http.delete(this.url + id)
  }
}
