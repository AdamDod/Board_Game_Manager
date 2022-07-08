import { BoardGame } from "./boardgame";
import { User } from "./user";

export class Game {
  game_id:string;
  group_id:string;
  boardgame:BoardGame;
  date_played:Date;
  players:User[];
  winners:User[];
}
