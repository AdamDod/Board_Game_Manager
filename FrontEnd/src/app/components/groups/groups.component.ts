import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group_service/group.service';
import { Group } from 'src/app/models/group';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups:Group[];

  constructor(public _group:GroupService) { }

  ngOnInit(): void {
    this._group.getAllGroups().subscribe(unpackedGroups => this.groups = unpackedGroups,null,()=>{
    });
  }

}
