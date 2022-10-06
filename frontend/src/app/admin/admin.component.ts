import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  teams: Team[] = [];
  projects: Project[] = [];

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

}
