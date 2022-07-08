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
  readonly baseUrl: string = "https://localhost:7214";

  constructor(private _http: HttpClient) { }

  getBoardGames(): Observable<BoardGame[]>{
    return this._http.get<BoardGame[]>(this.baseUrl + '/boardgame')
  }
}

