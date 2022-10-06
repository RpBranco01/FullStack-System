import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  @Input() team?: Team;
  teams: Team[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private router: Router,) { }

  creationForm = this.formBuilder.group({
    name: '',
  });

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
  }

  onSubmit(): void {
    let name = this.creationForm.controls['name'].value;
    if ((name.length > 3) && (name.match(/^[0-9a-z]+$/i))) {
      if (this.unique(name)) {
        this.createTeam(name);
      } else {
        alert('Esse nome já não se encontra disponível!');
      }
    } else {
      alert('Nome da equipa tem de ter pelo menos 4 caracteres alfanuméricos!');
    }
  }

  unique(new_name: string): boolean {
    for (const team of this.teams) {
      if (team.name === new_name) {
        return false;
      }
    }
    return true;
  }

  createTeam(name: string): void {
    this.teamService.createTeam({ name } as Team).subscribe(team => { this.teams.push(team); });
    this.router.navigate(['./admin']);
  }
}
