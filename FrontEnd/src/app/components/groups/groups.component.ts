import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group_service/group.service';
import { Group } from 'src/app/models/group';
import { AuthService } from '@auth0/auth0-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups:Group[];
  joinGroupID:string;
  userData;
  allgroups:Group[];
  loaded:boolean;

  constructor(public _group:GroupService, public _auth:AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._auth.getUser().subscribe(data => this.userData = data,null,()=>{
      this.load();
    });
  }

  load(){
    this._group.getAllGroupsForUser(this.userData.sub).subscribe(unpackedGroups => this.groups = unpackedGroups,null,()=>{
      this._group.getAllGroups().subscribe(unpackedGroups => this.allgroups = unpackedGroups,null,()=>{
        this.loaded = true;
      });
    });
  }

  joinGroup(){
    if (this.allgroups.findIndex(item => item.group_id === this.joinGroupID) !== -1) {
      this._group.addUserToGroup(this.joinGroupID, this.userData.sub).subscribe(data => data,
        (err:HttpErrorResponse)=>{
          this._snackBar.open("Error occured are you already in this team? - " + err.message, "close",{
            horizontalPosition: "center",
            verticalPosition:"top",
          });
        }
        ,()=>{
        this.load();
      })
    }else{
      this._snackBar.open("Group does not exist", "close",{
        horizontalPosition: "center",
        verticalPosition:"top",
      });
    }
  }

}
