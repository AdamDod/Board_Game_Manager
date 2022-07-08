import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl: string = "https://localhost:7214";

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this._http.get<User[]>(this.baseUrl + '/user',)
  }

  postUser(user): Observable<string>{
    const headers = { 'content-type': 'application/json' };
    var body = JSON.stringify(user);
    return this._http.post<string>(this.baseUrl + '/user', body, {'headers':headers})
  }
}
