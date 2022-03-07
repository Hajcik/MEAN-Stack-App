import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = 'http://localhost:5000/users/'

  constructor(private http: HttpClient) { }

  GET_Users() : Observable<any> {
    return this.http.get(this.url)
  }

  GET_User(id:any) : Observable<any> {
    return this.http.get(this.url + id)
  }

  POST_User(user:User) : Observable<any> {
    return this.http.post(this.url, user)
  }

  GET_IsAdmin(id:any) : Observable<any> {
    return this.http.get(this.url + 'isAdministrator', id)
  }
}
