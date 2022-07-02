import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';
import { MainComponent } from './components/main/main.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { SingleTeamComponent } from './components/single-team/single-team.component';

const routes: Routes = [
  { path: '', component: GroupsComponent},
  { path: 'group/:group_id', component: SingleTeamComponent},
  { path: 'new-group', component: NewGroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
