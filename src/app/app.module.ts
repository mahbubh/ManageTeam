import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule, routing} from "./app-routing.module";
import { AppComponent } from './app.component';
import { TeamViewComponent } from './component/team-view/team-view.component';
import { RosterViewComponent } from './component/roster-view/roster-view.component';
import { SortingPipe } from './shared/sort-pipe';
import { EditPlayerComponent } from './component/edit-player/edit-player.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TeamViewComponent,
    RosterViewComponent,
    SortingPipe,
    EditPlayerComponent
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    routing,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
