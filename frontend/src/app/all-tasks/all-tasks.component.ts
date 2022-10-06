import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Task } from '../task';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  @Input() user?: User;

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getUser(_id).subscribe(user => this.getTasks(user));
  }

  getTasks(user: User): void {
    this.user = user;
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  removeTask(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe(task => {
      this.tasks = this.tasks.filter(t => t !== task);
      this.ngOnInit();
    });
  }

}

