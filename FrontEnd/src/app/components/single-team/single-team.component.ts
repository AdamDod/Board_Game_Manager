import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group_service/group.service';

@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})
export class SingleTeamComponent implements OnInit {
  group_id: string;
  group:Group;

  constructor(private _Activatedroute:ActivatedRoute, private _group:GroupService) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.group_id = params.get('group_id') ?? '';
    });
    this._group.getSingleGroup(this.group_id).subscribe(unpackedGroup => this.group = unpackedGroup,null,()=>{
      
    })
  }

  ngOnInit(): void {
  }

}
