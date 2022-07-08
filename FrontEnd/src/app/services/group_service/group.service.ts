import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllGroupsForUser(user_id:string): Observable<Group[]>{
    return this._http.get<Group[]>(this.baseUrl + '/group/user/'+user_id)
  }

  postGroup(group): Observable<string>{
    const headers = { 'content-type': 'application/json' };
    var body = JSON.stringify(group);
    return this._http.post(this.baseUrl + '/group', body, {'headers':headers, responseType:'text'})
  }

  deleteUserFromGroup(group_id:string, user_id:string): Observable<string>{
    const params = new HttpParams()
      .append('group_id', group_id)
      .append('user_id', user_id);
    return this._http.delete<string>(this.baseUrl + '/groupallocation', {'params':params})
  }

  addUserToGroup(group_id:string, user_id:string): Observable<string>{
    const body = "";
    const params = new HttpParams()
      .append('group_id', group_id)
      .append('user_id', user_id);
    return this._http.post(this.baseUrl + '/groupallocation',body,{'params':params, responseType:'text'} )
  }
}
