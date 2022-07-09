import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';
import { Game } from 'src/app/models/game';
import { BoardGame } from 'src/app/models/boardgame';

@Injectable({
  providedIn: 'root'
})
export class BoardGameService {
  // readonly baseUrl: string = "https://localhost:7214";
  readonly baseUrl: string = "https://boardgame-manager-api.azurewebsites.net";
  constructor(private _http: HttpClient) { }

  getBoardGames(): Observable<BoardGame[]>{
    return this._http.get<BoardGame[]>(this.baseUrl + '/boardgame')
  }

  postBoardGame(boardgame): Observable<string>{
    const headers = { 'content-type': 'application/json' };
    var body = JSON.stringify(boardgame);
    return this._http.post(this.baseUrl + '/boardgame', body, {'headers':headers, responseType:'text'})
  }
}

