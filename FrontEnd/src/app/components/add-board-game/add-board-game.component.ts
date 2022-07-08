import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { BoardGame } from 'src/app/models/boardgame';
import { BoardGameService } from 'src/app/services/boardgame_service/boardgame.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-board-game',
  templateUrl: './add-board-game.component.html',
  styleUrls: ['./add-board-game.component.css']
})
export class AddBoardGameComponent implements OnInit {
  newgame:BoardGame = new BoardGame();


  constructor(public _boardGame:BoardGameService, public router:Router) {
    this.newgame.boardgame_id = '-1';
  }

  ngOnInit(): void {
  }

  submit(){
    this._boardGame.postBoardGame(this.newgame).subscribe(() => {},null,()=>{
      this.router.navigate(['.']);
    });
  }

}
