import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../shared/Constants';

@Component({
  selector: 'app-roster-view',
  templateUrl: './roster-view.component.html',
  styleUrls: ['./roster-view.component.css']
})
export class RosterViewComponent implements OnInit {
  teamData: any;
  positionRule: any;
  labels = {
    displayName: "Player Name",
    unit: "Unit",
    position: "Position",
    depthOrder: "Depth Order"
  }
  direction = 1;
  constructor( private router: Router) { }

  ngOnInit() {
    this.positionRule = JSON.parse(sessionStorage.getItem("posRule"));
    this.teamData = JSON.parse(sessionStorage.getItem("selected-team-roster"));
  }
  
  editPlayer(player){
    sessionStorage.setItem("Player",JSON.stringify(player));
    this.router.navigateByUrl(Constants.editPlayer);
  }

  teamview(){
    this.router.navigateByUrl(Constants.teamView);
  }

}
