import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  readonly baseUrl: string = "https://localhost:7214";

  constructor(private _http: HttpClient) { }

  getAllGroups(): Observable<Group[]>{
    return this._http.get<Group[]>(this.baseUrl + '/group')
  }

  getSingleGroup(group_id:string): Observable<Group>{
    return this._http.get<Group>(this.baseUrl + '/group/'+group_id)
  }

  postGroup(group): Observable<string>{
    const headers = { 'content-type': 'application/json' };
    var body = JSON.stringify(group);
    return this._http.post<string>(this.baseUrl + '/group', body, {'headers':headers})
  }
}
