import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../../shared/Constants';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {
  jsonTeamData: any;
  labels = {
    teamNameHeader: "Team Names",
    teamNickNameHeader: "Nick Name",
    teamPlayerCountHeader: "Player Count"
  }
  posArray = [];
  tempPosArr = [];
  posObj: any = {};
  constructor(private route: Router) { }

  ngOnInit() {

    this.jsonTeamData = JSON.parse(sessionStorage.getItem("teamJSON"));
    sessionStorage.setItem("teamJSON",JSON.stringify(this.jsonTeamData));
    for(var i = 0; i < this.jsonTeamData.teams.length; i++){
      for(var j =0 ;j < this.jsonTeamData.teams[i].roster.length; j++){
        var temp = {
          position: "",
          positionAbbr: "",
          unit: ""
        }
        temp.position = this.jsonTeamData.teams[i].roster[j].position;
        temp.positionAbbr = this.jsonTeamData.teams[i].roster[j].positionAbbr;
        temp.unit = this.jsonTeamData.teams[i].roster[j].unit;

        if(!this.tempPosArr.includes(temp.position)){
          this.posArray.push(temp);
          this.tempPosArr.push(temp.position);
          if(this.jsonTeamData.teams[i].roster[j].unit === "OFFENSE"){
            var val = 0;
            if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "WR"){
              val = Constants.positionSortOrder.WR;
            }
            else if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "QB"){
              val = Constants.positionSortOrder.QB;
            }
            else if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "RB"){
              val = Constants.positionSortOrder.RB;
            }

            this.posObj[this.jsonTeamData.teams[i].roster[j].positionAbbr] = val;
          }
          else{
            if(this.jsonTeamData.teams[i].roster[j].unit === "DEFENSE"){
              var val = 0;
              if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "LDE"){
                val = Constants.positionSortOrder.LDE;
              }
              else if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "RDE"){
                val = Constants.positionSortOrder.RDE;
              }
              else if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "WLB"){
                val = Constants.positionSortOrder.WLB;
              }
              else if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "NT"){
                val = Constants.positionSortOrder.NT;
              }
              else if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "SS"){
                val = Constants.positionSortOrder.SS;
              }
              else if(this.jsonTeamData.teams[i].roster[j].positionAbbr === "RCB"){
                val = Constants.positionSortOrder.RCB;
              }

              this.posObj[this.jsonTeamData.teams[i].roster[j].positionAbbr] = val;
            }
          }
        }
      }
    }
    sessionStorage.setItem("posRule",JSON.stringify(this.posObj));
    sessionStorage.setItem("PosArray",JSON.stringify(this.posArray));
  }

  rosterView(teamData){
    sessionStorage.setItem("selected-team-roster",JSON.stringify(teamData));
    this.route.navigateByUrl(Constants.rosterView);
  }

}
