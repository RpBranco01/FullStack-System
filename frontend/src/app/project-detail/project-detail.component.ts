import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project?: Project;
  @Input() team?: Team;
  @Input() projectTeam?: Team;

  allTeams: Team[] = [];
  availableTeams: Team[] = [];
  selected: string = "-- sem equipa --"

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(_id).subscribe(project => this.getProjectTeam(project));
    this.teamService.getTeams().subscribe(teams => this.getAvailableTeams(teams));
  }

  getProjectTeam(project: Project) {
    this.project = project;
    if (this.project) {
      if (!(this.project.team_id == null || this.project.team_id == '')) {
        this.teamService.getTeam(this.project.team_id).subscribe(team => this.projectTeam = team);
      }
    }
  }

  getAvailableTeams(teams: Team[]): void {
    this.allTeams = teams;
    for (const team of teams) {
      if (team.project_id == null || team.project_id === '') {
        this.availableTeams.push(team);
      }
    }
  }

  save(): void {
    if (this.project) {
      this.selected = this.selected.trim();
      if (!this.selected) { return; }
      if (this.selected === '-- sem equipa --') {
        this.takeOff();
      } else {
        this.project.team_id = this.selected;
        this.projectService.updateProject(this.project)
          .subscribe(() => this.getTeam(this.selected));
      }
    }
  }

  takeOff(): void {
    if (this.projectTeam && this.project) {
      this.project.team_id = '';
      this.projectService.updateProject(this.project).subscribe(() => this.updateProjectTeam());
    }
  }

  getTeam(_id: string): void {
    this.teamService.getTeam(_id).subscribe(team => this.updateTeam(team));
  }

  updateTeam(team: Team): void {
    this.team = team;
    if (this.team && this.project) {
      this.team.project_id = this.project._id;
      this.teamService.updateTeam(this.team).subscribe(() => this.updateProjectTeam());
    }

  }

  updateProjectTeam(): void {
    if (this.projectTeam) {
      this.projectTeam.project_id = '';
      this.teamService.updateTeam(this.projectTeam).subscribe(() => this.goBack());
    } else {
      this.goBack();
    }
  }

  onChange(team: string): void {
    this.selected = team;
  }

  goBack(): void {
    this.location.back();
  }
}
