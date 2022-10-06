import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { User } from '../user';
import { Task } from '../task';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  @Input() user?: User;

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getUser(_id).subscribe(user => this.getTaskList(user));
  }

  getTaskList(user: User) {
    this.user = user;

    if (this.user) {
      this.taskService.getUserTasks(this.user._id).subscribe(tasks => this.tasks = tasks);
    }
  }

  removeTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe(task => {
      this.tasks = this.tasks.filter(t => t !== task);
      this.ngOnInit();
    });
  }

}
