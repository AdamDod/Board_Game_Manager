import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { GroupsComponent } from './components/groups/groups.component';
import { SingleTeamComponent } from './components/single-team/single-team.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HolderComponent } from './components/holder/holder.component';
import { AddBoardGameComponent } from './components/add-board-game/add-board-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    SingleTeamComponent,
    NewGroupComponent,
    HolderComponent,
    AddBoardGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-0sne3sh6.us.auth0.com',
      clientId: 'jWVzgQuf0xL22UO5XYtMxDh4hWJklDhX'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
