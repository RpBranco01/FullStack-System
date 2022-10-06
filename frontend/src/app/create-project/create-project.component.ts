import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Project } from '../project';
import { FormBuilder } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  @Input() project?: Project;
  projects: Project[] = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,) { }

  creationForm = this.formBuilder.group({
    name: '',
    acronym: '',
    start: '',
    finish: ''
  });



  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }


  onSubmit(): void {
    let bool = true;
    let project_name = this.creationForm.controls['name'].value;
    let project_start = this.creationForm.controls['start'].value;
    let project_finish = this.creationForm.controls['finish'].value;
    let project_acronym = this.creationForm.controls['acronym'].value;

    if (!project_start) {
      alert("É necessário haver data de ínicio");
      bool = false;
    }
    if (project_finish) {
      if (project_start > project_finish) {
        alert("A data de fim não pode ser anterior à data de início!");
        bool = false;
      }
    }
    if (!((project_name.length > 3) && (project_name.match(/^[0-9a-z]+$/i)))) {
      alert('Nome do projeto tem de ser alfanumérico e maior que 3 caracteres');
      bool = false;
    }
    if (this.isUniqueProject(project_acronym)) {
      if (bool) {
        this.createProject(project_name, project_acronym, project_start, project_finish);
        this.router.navigate(['./admin']);

      }
    }
  }

  isUniqueProject(project_acronym: string): boolean {
    for (const project of this.projects) {

      if (project.acronym == project_acronym) {
        alert('Acrónimo não é único');
        return false;
      }
    }
    if (project_acronym.length == 3 && (project_acronym.match(/^[0-9a-z]+$/i))) {
      return true;
    }
    alert('Acrónimo deve ter exatamente 3 letras maiúsculas');
    return false;
  }

  createProject(name: string, acronym: string, start: Date, end: Date): void {
    name = name.trim();
    if (!name) { return; }
    var tasks_id: string[] = [];
    if (end) {
      this.projectService.createProject({ name, acronym, start, end, tasks_id } as Project).subscribe(project => this.project = project);
    } else {
      this.projectService.createProject({ name, acronym, start, tasks_id } as Project).subscribe(project => this.project = project);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
