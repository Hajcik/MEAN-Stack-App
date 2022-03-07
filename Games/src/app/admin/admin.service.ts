import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly url = 'http://localhost:5000/users/'
  constructor(private http: HttpClient) { }

  PUT_User(id:any, user:User) : Observable<any> {
    return this.http.put(`${this.url}/${id}`, user)
  }

  DELETE_User(id:any) : Observable<any> {
    return this.http.delete(this.url + id)
  }
}
