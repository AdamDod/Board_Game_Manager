import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { findIndex } from 'rxjs';
import { Game } from 'src/app/models/game';
import { Group } from 'src/app/models/group';
import { GameService } from 'src/app/services/game_service/game.service';
import { GroupService } from 'src/app/services/group_service/group.service';

export interface GamesDialogData {
  groups:Group[];
  games:Game[];
}

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css'],
})
export class HubComponent implements OnInit {
  userData;
  groups: Group[];
  games: Game[];
  loaded: boolean = false;

  constructor(
    public _group: GroupService,
    public _auth: AuthService,
    public _game: GameService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._auth.getUser().subscribe(
      (data) => (this.userData = data),
      null,
      () => {
        this.load();
      }
    );
  }

  load() {
    this._group.getAllGroupsForUser(this.userData.sub).subscribe((unpackedGroups) => (this.groups = unpackedGroups),null,() => {
      this._game.getGamesForUser(this.userData.sub).subscribe(unpackedGame => this.games = unpackedGame,null,()=>{
        this.loaded = true;
        console.log(this.groups)
      });
    });
  }

  calcWins(): number {

    if (this.games != null) {
      var total: number = 0;
      this.games.forEach((game) => {
        if (game.winners.some((winner) => winner.user_id === this.userData.sub)) {
          total += 1;
        }
      });
      return total;
    }else{
      return 0;
    }

  }
  openGroupDialog() {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      data: this.groups,
    });
  }

  openGameDialog() {
    this.dialog.open(GameDialogComponent, {
      data:{
        games:this.games,groups:this.groups,
      }
    });
  }

  numOfGames():number{
    if (this.games != null) {
      return this.games.length;
    }else{
      return 0;
    }
  }

}

@Component({
  selector: 'group-dialog',
  templateUrl: './dialogbox/groups-dialog.html',
  styleUrls: ['./hub.component.css'],
})
export class GroupDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Group[]) {}
}

@Component({
  selector: 'game-dialog',
  templateUrl: './dialogbox/games-dialog.html',
  styleUrls: ['./hub.component.css'],
})
export class GameDialogComponent {
  userData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _auth: AuthService) {
    this._auth.getUser().subscribe(
      (data) => (this.userData = data),
      null,
      () => {
      }
    );
  }

  winner(game):Boolean{
    return game.winners.some(e => e.user_id === this.userData.sub)
  }

  findGroupName(group_id):string{
    const ind = this.data.groups.findIndex(group => group.group_id === group_id);
    return  this.data.groups[ind].group_name;
  }
}
