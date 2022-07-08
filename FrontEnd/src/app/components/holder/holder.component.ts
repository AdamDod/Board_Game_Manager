import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService} from '@auth0/auth0-angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user_service/user.service';

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit {
  existingUser:boolean = false;
  users:User[];
  userData;
  newUser:User = new User();

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService,  private _users:UserService) {
    this._users.getAllUsers().subscribe(users=>this.users = users,null,()=>{
      this.auth.getUser().subscribe(data => this.userData = data,null,()=>{
        if (this.users.findIndex(u => u.user_id === this.userData.sub) == -1) {
          this.newUser.user_id = this.userData.sub;
          this.newUser.user_description = '';
          this.newUser.user_name = this.userData.nickname;
          this._users.postUser(this.newUser).subscribe(data => data,null,()=>{
            console.log("new user created")
          })
        }else{
          console.log("user exists")
        }
      })
    });
  }

  ngOnInit(): void {

  }

  login(){
    this.auth.loginWithRedirect()
  }

}
