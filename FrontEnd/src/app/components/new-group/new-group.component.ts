import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { GroupService } from 'src/app/services/group_service/group.service';
import { UserService } from 'src/app/services/user_service/user.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Admin'];
  newGroup:Group = new Group();
  users:User[] = new Array<User>();
  selectedUser:User

  @ViewChild(MatTable) table: MatTable<User>;


  constructor(public _user:UserService,private _snackBar: MatSnackBar, public _group:GroupService) {
    this.newGroup.users = new Array<User>();
    this.newGroup.admins = new Array<User>();
    this.newGroup.create_date = new Date();
    this.newGroup.group_name = '';
    this.newGroup.group_id = "-1";
  }

  ngOnInit(): void {
    this._user.getAllUsers().subscribe(unpackedUser => this.users = unpackedUser,null,()=>{

    });
  }

  createGroup(){
    if (this.newGroup.group_name != '') {
      this._group.postGroup(this.newGroup).subscribe();
    }else{
      this._snackBar.open("Please make sure you have a name!", "close",{
        horizontalPosition: "center",
        verticalPosition:"top",
      });
    }
  }

  addUser(){
    if (this.newGroup.users.indexOf(this.selectedUser) == -1) {
      this.newGroup.users.push(this.selectedUser)
      this.table.renderRows();
      this._snackBar.open("User added to team", "close",{
        horizontalPosition: "center",
        verticalPosition:"top",
      });
    }else{
      this._snackBar.open("User already in team", "close",{
        horizontalPosition: "center",
        verticalPosition:"top",
      });
    }
  }
  getAdminCheckboxValues(ev, user:User){
    if (ev.target.checked) {
      console.log("checked")
    }
  }

  isAdmin(user):boolean{
    if (this.newGroup.admins.indexOf(user) !== -1) {
      return true
    }else{
      return false
    }
  }

  admin(event, user){
    if (event.checked) {
      if (this.newGroup.admins.indexOf(user) == -1) {
        this.newGroup.admins.push(user);
      }else{
        return
      }
    }else{
      delete this.newGroup.admins[this.newGroup.admins.indexOf(user)];
    }
  }
}
