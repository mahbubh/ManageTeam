import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Constants } from '../../shared/Constants';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  posArray = [];
  unitArr = ["OFFENSE", "DEFENSE"];
  displayNameNg = "";
  unitNg = "";
  positionNg = "";
  depthOrderNg = "";
  labels = {
    depthOrder: "Depth Order",
    unit: "Unit",
    displayName: "Full Name",
    position: "Position",
  }
  changedPosition: any = {};
  constructor(private router: Router) { }

  ngOnInit() {
    this.posArray = JSON.parse(sessionStorage.getItem("PosArray"));
    var player = JSON.parse(sessionStorage.getItem("Player"));
    this.depthOrderNg = player.depthOrder;
    this.positionNg = player.position;
    for(var i = 0; i < this.posArray.length; i++){
      if(this.posArray[i].position === this.positionNg){
        this.changedPosition = this.posArray[i];
        break;
      }
    }
    this.displayNameNg = player.person.displayName;
    this.unitNg = player.unit;
  }

  save(form){
    if(form.invalid){
      return;
    }
    var teamJSON = JSON.parse(sessionStorage.getItem("teamJSON"));
    var team = JSON.parse(sessionStorage.getItem("selected-team-roster"));
    var player = JSON.parse(sessionStorage.getItem("Player"));
    for(var i = 0; i < teamJSON.teams.length; i++){
      if(teamJSON.teams[i].id === team.id){
        for(var j = 0; j < teamJSON.teams[i].roster.length; j++){
          if(teamJSON.teams[i].roster[j].person.displayName === player.person.displayName){
            teamJSON.teams[i].roster[j].person.displayName = this.displayNameNg;
            teamJSON.teams[i].roster[j].position = this.changedPosition.position;
            teamJSON.teams[i].roster[j].positionAbbr = this.changedPosition.positionAbbr;
            teamJSON.teams[i].roster[j].depthOrder = this.depthOrderNg;
            teamJSON.teams[i].roster[j].unit = this.changedPosition.unit;
            sessionStorage.setItem("Player",JSON.stringify(teamJSON.teams[i].roster[j]));
          }
        }
        sessionStorage.setItem("selected-team-roster",JSON.stringify(teamJSON.teams[i]));
      }
    }
    sessionStorage.setItem("teamJSON",JSON.stringify(teamJSON));
    this.router.navigateByUrl(Constants.rosterView);
  }

  changePosition(){
    var existingUnit = this.changedPosition.unit;
    for(var i = 0; i < this.posArray.length; i++){
      if(this.positionNg === this.posArray[i].position){
        this.changedPosition = this.posArray[i];
        this.unitNg = this.changedPosition.unit;
        if(existingUnit !== this.changedPosition.unit){
          alert("This will also change Unit Type to " + this.unitNg);
        }
      }
    }
    
  }

  cancel(){
    this.router.navigateByUrl(Constants.rosterView);
  }

  changeUnit(){
    var existingUnit = this.changedPosition.unit;
    for(var i = 0; i < this.posArray.length; i++){
      if(this.posArray[i].unit === this.unitNg){
        this.changedPosition = this.posArray[i];
        this.positionNg = this.changedPosition.position;
        break;
      }
    }
    if(existingUnit !== this.changedPosition.unit){
      alert("This will also change Position to a " + this.unitNg + " position");
    }
  }

}
