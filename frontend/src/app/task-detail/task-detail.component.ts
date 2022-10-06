import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  @Input() project?: Project;
  @Input() task?: Task;
  @Input() user?: User;

  availableProjects: Project[] = [];
  availableUsers: User[] = [];
  associatedUsers: User[] = [];

  isVisible: boolean = false;

  tasks: Task[] = [];
  associatedTasks: Task[] = [];


  selected: string = '-- sem projeto --';
  selectedUser: string = '';

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  creationForm = this.formBuilder.group({
    progress: '',
    start: '',
    finish: '',
  });

  ngOnInit(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(_id).subscribe((task) => this.getProject(task));
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.getAvailableUsers();
    });
  }

  getProject(task: Task) {
    this.task = task;
    if (this.task && this.task.project_id && !(this.task.project_id === '')) {
      this.projectService
        .getProject(this.task.project_id)
        .subscribe((project) => this.getAllProjects(project));
    } else {
      this.projectService
        .getProjects()
        .subscribe((projects) => this.setAvailableProjects(projects));
    }
  }

  getAllProjects(project: Project) {
    this.project = project;
    this.projectService
      .getProjects()
      .subscribe((projects) => this.setAvailableProjects(projects));
  }

  setAvailableProjects(projects: Project[]): void {
    if (projects && this.project) {
      projects.forEach((item, index) => {
        if (item._id === this.project?._id) projects.splice(index, 1);
      });
    }
    this.availableProjects = projects;
  }

  //SALVAR DATAS APENAS
  saveDates(): void {
    let task_start = this.creationForm.controls['start'].value;
    let task_finish = this.creationForm.controls['finish'].value;

    let todayDate = new Date().toLocaleDateString();
    let todayTime = new Date().toLocaleTimeString();

    let todayAux = todayDate.split("/");
    let today = todayAux[2] + "-" + todayAux[1] + "-" + todayAux[0];

    todayAux = todayTime.split(":");
    today = today + "T" + todayAux[0] + ":" + todayAux[1];

    if (task_start < today) {
      alert('Data de início nao pode ser antes da atual!');
      return;
    }
    if (task_start >= task_finish) {
      alert('Data de fim nao pode ser anterior ou igual à de início!');
      return;
    }

    let canUpdate = true;
    if (this.task?.priority == "urgente") {
      this.associatedTasks.forEach(task => {
        if (task.priority === "urgente" && task.progress < 100 && task.start_date && task.finish_date) {
          if (!((task_start < task.start_date && task_finish < task.start_date)
            || (task_start > task.finish_date && task_finish > task.finish_date))) {

            alert("Duas tarefas urgentes não podem estar sobrepostas!");
            canUpdate = false;
          }
        }
      });
    }

    if (this.task && canUpdate) {
      this.task.start_date = task_start;
      this.task.finish_date = task_finish;

      this.taskService.updateTask(this.task).subscribe(task => this.ngOnInit())
    }
  }

  //GUARDAR PROGRESSO APENAS!!!!
  saveProgress(): void {
    let task_progress = this.creationForm.controls['progress'].value;

    if (task_progress !== "") {
      if (!this.checkProgress(task_progress)) {
        return;
      }
      if (this.task) {
        this.task.progress = task_progress;
        this.taskService.updateTask(this.task).subscribe(() => this.ngOnInit());
      }
    }
  }

  // GUARDAR ASSOCIAÇÃO ENTRE PROJETOS E TAREFAS
  save(): void {
    if (this.task) {
      this.selected = this.selected.trim();
      if (!this.selected) {
        return;
      }
      if (this.selected === '-- sem projeto --') {
        this.takeOff();
      } else {
        this.task.project_id = this.selected;
        this.taskService
          .updateTask(this.task)
          .subscribe((task) => this.updateProject(task));
        this.ngOnInit();
      }
    }
  }

  updateProject(task: Task): void {
    if (this.project && task) {
      let index = this.project.tasks_id.indexOf(task._id);
      if (index > -1) {
        this.project.tasks_id.splice(index, 1);
      }
      this.projectService
        .updateProject(this.project)
        .subscribe(() => this.getNewProject());
    } else if (!this.project && task) {
      this.getNewProject();
    }
  }

  getNewProject(): void {
    if (this.task) {
      this.projectService
        .getProject(this.task.project_id)
        .subscribe((project) => this.addTaskToProject(project));
    }
  }

  addTaskToProject(project: Project): void {
    this.project = project;
    if (this.project && this.task) {
      this.project.tasks_id.push(this.task._id);
      this.projectService
        .updateProject(this.project)
        .subscribe(() => this.goBack());
    }
  }

  takeOff(): void {
    if (this.project && this.task) {
      let index = this.project.tasks_id.indexOf(this.task._id);
      if (index > -1) {
        this.project.tasks_id.splice(index, 1);
      }
      this.projectService
        .updateProject(this.project)
        .subscribe(() => this.removeTaskProject());
    }
  }

  removeTaskProject(): void {
    if (this.task) {
      this.task.project_id = '';
      this.taskService.updateTask(this.task).subscribe(() => this.goBack());
    }
  }

  onChange(project: string): void {
    this.selected = project;
  }

  goBack(): void {
    this.location.back();
  }

  setUser(user: string): void {
    this.selectedUser = user;
  }

  addUser(): void {
    if (this.task) {
      this.selectedUser = this.selectedUser.trim();
      if (!this.selectedUser || this.selectedUser === '') {
        return;
      }

      this.task.users_id.push(this.selectedUser);
      this.taskService
        .updateTask(this.task)
        .subscribe((task) => this.ngOnInit());
    }
  }

  removeUser(user: User): void {
    this.user = user;
    if (this.task) {
      var index = this.task.users_id.indexOf(this.user._id);
      if (index > -1) {
        this.task.users_id.splice(index, 1);
      }
      this.taskService.updateTask(this.task).subscribe((task) => this.ngOnInit());
    }
  }


  getAvailableUsers(): void {
    this.associatedUsers = [];
    this.availableUsers = [];

    this.userService
      .getUsers()
      .subscribe((users) => {
        this.setAvailableUsers(users)

        this.associatedTasks = [];
        this.tasks.forEach((task) => {

          let hasTask = false;
          this.associatedTasks.forEach((a_task) => {
            if (a_task._id === task._id) {
              hasTask = true;
            }
          });

          let hasUser = false
          this.associatedUsers.forEach((user) => {
            if (task.users_id.indexOf(user._id) >= 0) {
              hasUser = true;
            }
          });

          if (!hasTask && hasUser && task._id !== this.task?._id) {
            this.associatedTasks.push(task);
          }
        })
      });
  }

  setAvailableUsers(users: User[]): void {
    users.forEach((user) => this.aux(user));
  }

  aux(user: User): void {
    if (this.task) {
      if (this.task.users_id.indexOf(user._id) === -1) {
        this.availableUsers.push(user);
      } else {
        this.associatedUsers.push(user);
      }
    }
  }

  checkProgress(progress: number): boolean {
    if (progress > 100) {
      alert('O progresso nao pode ser maior que 100');
      return false;
    } else if (progress < 0) {
      alert('O progresso nao pode ser menor que 0');
      return false;
    }
    return true;
  }

  checkDates(task: Task, tasks_user: Task[]): boolean {
    let bool = true;

    for (let i = 0; i < tasks_user.length; i++) {

      console.log(task.finish_date);
      console.log(tasks_user[i].start_date);

      if (
        task.finish_date >= tasks_user[i].start_date &&
        task.start_date <= tasks_user[i].finish_date
      ) {

        bool = false;
      }
    }

    return bool;
  }
}
