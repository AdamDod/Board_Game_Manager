import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { MainComponent } from './components/main/main.component';
import { GroupsComponent } from './components/groups/groups.component';
import { SingleTeamComponent } from './components/single-team/single-team.component';
import { NewGroupComponent } from './components/new-group/new-group.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GroupsComponent,
    SingleTeamComponent,
    NewGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
