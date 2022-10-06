import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { User } from '../user';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  @Input() user?: User;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getUser(_id).subscribe(user => this.user = user);
  }

}
