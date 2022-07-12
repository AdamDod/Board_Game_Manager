import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';
import { Game } from 'src/app/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // readonly baseUrl: string = "https://localhost:7214";
  readonly baseUrl: string = "https://boardgame-manager-api.azurewebsites.net";

  constructor(private _http: HttpClient) { }

  getGamesForGroup(group_id:string): Observable<Game[]>{
    const params = new HttpParams()
      .append('group_id', group_id);
    return this._http.get<Game[]>(this.baseUrl + '/game', {'params':params})
  }

  postGame(game): Observable<string>{
    const headers = { 'content-type': 'application/json' };
    var body = JSON.stringify(game);
    return this._http.post<string>(this.baseUrl + '/game', body, {'headers':headers, responseType:'json'})
  }

  getGamesForUser(user_id:string): Observable<Game[]>{
    const params = new HttpParams()
      .append('user_id', user_id);
    return this._http.get<Game[]>(this.baseUrl + '/gamebyuser', {'params':params})
  }

}
