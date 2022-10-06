import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-users',
  templateUrl: './team-users.component.html',
  styleUrls: ['./team-users.component.css']
})
export class TeamUsersComponent implements OnInit {

  teams: Team[] = [];

  constructor(
    private teamService: TeamService,
  ) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
  }

}
