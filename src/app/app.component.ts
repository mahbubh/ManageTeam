import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  jsonTeamData: any;
  constructor(private route: Router, private http: HttpClient) {
    this.http.get('assets/json/data.json')
      .subscribe(data => {
        console.log(data);
        this.jsonTeamData = data;
        sessionStorage.setItem("teamJSON",JSON.stringify(this.jsonTeamData));
      });
  }
}
