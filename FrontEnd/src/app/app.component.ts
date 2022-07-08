import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService} from '@auth0/auth0-angular';
import { User } from './models/user';
import { UserService } from './services/user_service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';
  

  constructor(@Inject(DOCUMENT) public document: Document, public auth:AuthService, private _users:UserService) {
  }

  ngOnInit() {
  }

  continue(){

  }
}
