import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { User } from '../user';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() user?: User;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getUser(_id).subscribe(user => this.user = user);
  }

  goBack(): void {
    if (this.user) {
      this.router.navigate([`./task-list/${this.user._id}`]);
    }
  }
}
