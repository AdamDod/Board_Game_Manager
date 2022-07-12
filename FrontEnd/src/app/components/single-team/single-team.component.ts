import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { BoardGame } from 'src/app/models/boardgame';
import { Game } from 'src/app/models/game';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { BoardGameService } from 'src/app/services/boardgame_service/boardgame.service';
import { GameService } from 'src/app/services/game_service/game.service';
import { GroupService } from 'src/app/services/group_service/group.service';
import { UserService } from 'src/app/services/user_service/user.service';

@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})
export class SingleTeamComponent implements OnInit {
  group_id: string;
  group:Group = new Group();
  games:Game[];
  boardgames:BoardGame[];
  userDisplayedColumns: string[] = ['name', 'played', 'wins', 'delete','admin'];
  gameDisplayedColumns: string[] = ['boardgame_name','date_played',  'players', 'winners'];
  gameUserDisplayedColumns: string[] = ['name', 'played', 'winner'];
  loaded:boolean = false;
  newGame:Game = new Game();
  allUsers:User[];
  selectedUser:User;
  userData;



  constructor(private _Activatedroute:ActivatedRoute, private _group:GroupService,private _game:GameService, private _boardgame:BoardGameService, private _users:UserService, private _snackBar: MatSnackBar,public auth: AuthService) {
    this.newGame.players = new Array<User>();
    this.newGame.winners = new Array<User>();
    this.newGame.date_played = new Date();
    this.newGame.game_id = "-1";
    this.group.users = new Array<User>();
    this._Activatedroute.paramMap.subscribe(params => {
      this.group_id = params.get('group_id') ?? '';
    });
    this.load();
  }

  ngOnInit(): void {

  }

  load(){
    this._group.getSingleGroup(this.group_id).subscribe(unpackedGroup => this.group = unpackedGroup,null,()=>{
      this._game.getGamesForGroup(this.group_id).subscribe(unpackedGames => this.games = unpackedGames, null, ()=>{
        this._boardgame.getBoardGames().subscribe(unpackedGames => this.boardgames = unpackedGames, null, ()=>{
          this._users.getAllUsers().subscribe(unpackedGames => this.allUsers = unpackedGames, null, ()=>{
            this.auth.getUser().subscribe(data => this.userData = data,null,()=>{
              this.loaded = true;
            })
          })
        })
      })
    })
  }

  played(user_id:string):number{
    let total:number = 0;
    if (this.games != null) {
      this.games.forEach(game => {
        game.players.forEach(players => {
          if (players.user_id === user_id) {
            total++;
          }
        });
      });
    }
    return total;
  }

  wins(user_id:string):number{
    let total:number = 0;
    if (this.games != null) {
      this.games.forEach(game => {
        game.winners.forEach(players => {
          if (players.user_id === user_id) {
            total++;
          }
        });
      });
    }
    return total;
  }

  addNewGame(){
    this.newGame.group_id = this.group.group_id;
    this._game.postGame(this.newGame).subscribe(unpacked => unpacked,()=>{
      this.load();
    });
  }

  addPlayer(event, user){
    if (event.checked) {
      if (this.newGame.players.indexOf(user) == -1) {
        this.newGame.players.push(user);
      }else{
        return
      }
    }else{
      delete this.newGame.players[this.newGame.players.indexOf(user)];
    }
  }

  addWinner(event, user){
    if (event.checked) {
      if (this.newGame.winners.indexOf(user) == -1) {
        this.newGame.winners.push(user);
      }else{
        return
      }
    }else{
      delete this.newGame.winners[this.newGame.winners.indexOf(user)];
    }
  }

  removePlayer(user:User){
    if (this.isUserAdmin()) {
      this._group.deleteUserFromGroup(this.group.group_id,user.user_id).subscribe(null,null,()=>{
        this._snackBar.open("User Removed", "close",{
          horizontalPosition: "center",
          verticalPosition:"top",
        });
        this.load();
      });
    }else{
      this._snackBar.open("You are not an admin and cannot perform this action", "close",{
        horizontalPosition: "center",
        verticalPosition:"top",
      });
    }
  }

  isUserAdmin(){
    if (this.group.admins.findIndex(id => id.user_id === this.userData.sub) != -1) {
      return true
    }else{
      return false;
    }
  }

  isOtherUserAdmin(user){
    if (this.group.admins.findIndex(id => id.user_id === user.user_id) != -1) {
      return true
    }else{
      return false;
    }
  }
}
