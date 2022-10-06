import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @Input() user?: User;
  @Input() task?: Task;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  creationForm = this.formBuilder.group({
    name: '',
    priority: 'alta'
  });

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getUser(_id).subscribe(user => this.user = user);
  }

  onSubmit(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    if (this.user && this.checkTaskName()) {
      this.createTask(this.creationForm.controls['name'].value, this.creationForm.controls['priority'].value, 0, _id);
    }
  }

  checkTaskName(): boolean {
    let name = this.creationForm.controls['name'].value;
    if (!((name.length > 3) && (name.match(/^[0-9a-z]+$/i)))) {
      alert('Nome da tarefa deve ter menos 4 caracteres alfanuméricos');
      return false;
    }
    return true;
  }

  createTask(name: string, priority: string, progress: number, user_id: string): void {
    name = name.trim();
    priority = priority.trim();
    user_id = user_id.trim();

    let users_id = [user_id];

    if (!name || !priority || !user_id) { return; }
    this.taskService.createTask({ name, priority, progress, user_id, users_id } as Task).subscribe(task => this.goBack());
  }

  goBack(): void {
    if (this.user) {
      this.router.navigate([`./task-list/${this.user._id}`]);
    }
  }
}