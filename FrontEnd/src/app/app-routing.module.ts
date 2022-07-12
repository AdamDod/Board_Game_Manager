import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBoardGameComponent } from './components/add-board-game/add-board-game.component';
import { GroupsComponent } from './components/groups/groups.component';
import { HubComponent } from './components/hub/hub.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { SingleTeamComponent } from './components/single-team/single-team.component';

const routes: Routes = [
  { path: '', component: HubComponent},
  { path: 'groups', component: GroupsComponent},
  { path: 'group/:group_id', component: SingleTeamComponent},
  { path: 'new-group', component: NewGroupComponent},
  { path: 'new-board-game', component: AddBoardGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
