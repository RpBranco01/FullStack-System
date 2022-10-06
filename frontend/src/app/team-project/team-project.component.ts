import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-project',
  templateUrl: './team-project.component.html',
  styleUrls: ['./team-project.component.css']
})
export class TeamProjectComponent implements OnInit {

  projects: Project[] = [];

  constructor(
    private teamService: TeamService,
    private projectService: ProjectService, //TODO: add project service
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }
}
