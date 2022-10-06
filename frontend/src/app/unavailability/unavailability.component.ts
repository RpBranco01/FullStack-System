import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Unavailability } from '../unavailability';
import { UnavailabilityService } from '../unavailability.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unavailability',
  templateUrl: './unavailability.component.html',
  styleUrls: ['./unavailability.component.css']
})
export class UnavailabilityComponent implements OnInit {

  @Input() user?: User;
  @Input() unavailability?: Unavailability;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private unavailabilityService: UnavailabilityService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,) { }


  creationForm = this.formBuilder.group({
    date: '',
    begin: '',
    end: ''
  });


  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getUser(_id).subscribe(user => this.user = user);
  }

  onSubmit(): void {
    let date = this.creationForm.controls['date'].value;
    let begin = this.creationForm.controls['begin'].value;
    let end = this.creationForm.controls['end'].value;

    let today = new Date().toLocaleDateString();
    let todayAux = today.split("/");
    today = todayAux[2] + "-" + todayAux[1] + "-" + todayAux[0];

    if (!date || !begin || !end) {
      alert('Todos os campos devem ser preenchidos!');
    }
    else if (today > date) {
      alert('Período de indisponibilidade não pode ser anterior a hoje!');
    }
    else if (begin > end) {
      alert('Hora de ínicio tem de ser anterior à hora de fim!');
    }
    else {

      console.log("has values");

      let begin_date = new Date(date);
      let begin_hours = begin[0] + begin[1];
      let begin_minutes = begin[3] + begin[4];
      begin_date.setHours(begin_hours, begin_minutes);

      let end_date = new Date(date);
      let end_hours = end[0] + end[1];
      let end_minutes = end[3] + end[4];
      end_date.setHours(end_hours, end_minutes);

      if (this.user) {
        this.createUnavailability(begin_date, end_date, this.user._id)
      }
    }
  }

  createUnavailability(begin: Date, end: Date, user_id: string): void {
    user_id = user_id.trim();
    if (!begin || !end || !user_id) { return; }
    this.unavailabilityService.createUnavailability({ begin, end, user_id } as Unavailability).subscribe(unavailability => {
      this.unavailability = unavailability;
      alert('Período de indisponibilidade definido!');
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
