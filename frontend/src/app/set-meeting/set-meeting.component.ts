import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Meeting } from '../meeting';
import { MeetingService } from '../meeting.service';
import { TaskService } from '../task.service';
import { Unavailability } from '../unavailability';
import { UnavailabilityService } from '../unavailability.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-set-meeting',
  templateUrl: './set-meeting.component.html',
  styleUrls: ['./set-meeting.component.css']
})
export class SetMeetingComponent implements OnInit {
  @Input() user?: User;

  users: User[] = [];
  selectedUsers: User[] = [];
  availableUsers: User[] = [];

  selectedUser: string = "";
  duration: number = 0;
  start_date?: Date;
  finish_date?: Date;

  allDates: Date[] = [];
  meetingList: Meeting[] = [];
  unavailabilityList: Unavailability[] = [];

  availableMeetingDates: Date[] = [];
  availableUnavailabilityDates: Date[] = [];
  availableDates: Date[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private unavailabilityService: UnavailabilityService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private router: Router,
  ) { }


  creationForm = this.formBuilder.group({
    duration: '',
    start: '',
    finish: ''
  });

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();
  }

  getUser(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.taskService.getUser(_id).subscribe(user => this.user = user);
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe(users => this.getAvailableUsers(users));
  }

  getAvailableUsers(users: User[]): void {
    this.users = users;
    this.availableUsers = [];
    let bool = true;
    if (this.users) {
      this.users.forEach(all_user => {
        bool = true;
        this.selectedUsers.forEach(selected_user => {
          if (all_user._id === selected_user._id) {
            bool = false;
          }
        })
        if (bool) {
          this.availableUsers.push(all_user);
        }
      })
    }
  }

  removeUser(selected_user: User): void {
    this.selectedUsers.forEach((user, index) => {
      if (user._id === selected_user._id) {
        this.selectedUsers.splice(index, 1);
      }
    });
    this.ngOnInit();
  }

  setUser(user: string): void {
    this.selectedUser = user
  }

  addUser(): void {
    if (this.selectedUser) {
      this.taskService.getUser(this.selectedUser).subscribe(user => {
        this.selectedUsers.push(user);
        this.meetingService.getMeetingsByUser(user._id).subscribe(meetings => {
          this.meetingList.push.apply(this.meetingList, meetings);
        })
        this.unavailabilityService.getUnavailabilitiesByUser(user._id).subscribe(unavailabilities => {
          this.unavailabilityList.push.apply(this.unavailabilityList, unavailabilities);
        })
        this.ngOnInit();
      });
    }
  }

  setDuration(): void {
    let duration = this.creationForm.controls['duration'].value;
    if (!duration) { return; }
    duration = duration.trim();
    if (+duration % 30 === 0) {
      this.duration = +duration;
    } else {
      alert('Duração tem de ser múltiplo de 30 (Ex: 30, 60, 90, etc.)!');
    }
  }

  saveDates(): void {
    let start_date = this.creationForm.controls['start'].value;
    let finish_date = this.creationForm.controls['finish'].value;
    if (this.selectedUsers.length < 2) {
      alert('É necessário selecionar pelo menos dois utilizadores!');
      return;
    }
    if (this.duration === 0) {
      alert('É necessário definir a duração da reunião!');
      return;
    }
    if (!start_date || !finish_date) {
      alert('É necessário selecionar datas de início e de fim!');
      return;
    }

    let today = new Date().toLocaleDateString();

    let check_start_date = new Date(start_date);
    let check_finish_date = new Date(finish_date);
    check_start_date.setHours(0, 0);
    check_start_date.setHours(0, 0);

    let todayAux = today.split("/");
    today = todayAux[2] + "/" + todayAux[1] + "/" + todayAux[0];

    let todayDate = new Date(today);


    if (check_start_date < todayDate) {
      alert('Não pode marcar reuniões antes do dia atual!');
    } else {
      if (check_start_date > check_finish_date) {
        alert('Data de início não pode ser posterior à data de fim!');
      } else {
        this.start_date = start_date;
        this.finish_date = finish_date;

        this.createAllDates();
        this.verifyMeetings();

        this.availableMeetingDates.forEach((m_date) => {
          this.availableUnavailabilityDates.forEach((u_date) => {
            if (m_date == u_date) {
              this.availableDates.push(m_date);
            }
          })
        })


        let users_id: string[] = [];
        this.selectedUsers.forEach((user) => users_id.push(user._id));
        let available_dates = this.availableDates;
        let duration = this.duration;

        this.meetingService.createMeeting({ duration, users_id, available_dates } as Meeting).subscribe(meeting => {
          this.router.navigate([`./meeting-dates/${meeting._id}`]);
        });
      }
    }
  }

  getAvailableDates(): Date[] {
    console.log(this.availableDates.length);
    return this.availableDates;
  }

  createAllDates(): void {
    if (this.start_date && this.finish_date && this.duration > 0) {

      let newDate = new Date(this.start_date);
      let lastDate = new Date(this.finish_date);

      let d = this.duration / 30;
      var h;
      var m;

      if (d % 2 === 0) {
        h = 17 - (d / 2);
        m = 30;
      }
      else {
        h = 17 - ((d + 1) / 2) + 1;
        m = 0;
      }

      newDate.setHours(9, 30);
      lastDate.setHours(h, m);

      let today = new Date();

      while (newDate <= lastDate) {
        if (newDate > today) {
          this.allDates.push(newDate);
        }

        if ((newDate.getHours() >= h) && (newDate.getMinutes() >= m)) {
          if (newDate.getDay() === 5) {
            newDate = new Date(newDate.getTime() + 58 * 3600000)
            newDate.setHours(9, 30);
          }
          else {
            newDate = new Date(newDate.getTime() + 10 * 3600000)
            newDate.setHours(9, 30);
          }
        }
        else {
          newDate = new Date(newDate.getTime() + 30 * 60000)
        }
      }
    }

  }

  verifyMeetings(): void {
    this.availableMeetingDates = this.allDates;
    this.availableUnavailabilityDates = this.allDates;

    this.meetingList.forEach((meeting) => {
      this.allDates.forEach((date) => {
        let end_date = new Date(date.getTime() + this.duration * 60000);
        let u_begin = new Date(meeting.begin);
        let u_end = new Date(meeting.end);

        if (!((date < u_begin && end_date <= u_begin)
          || (date >= u_end && end_date > u_end))) {

          let index = this.availableMeetingDates.indexOf(date);
          this.availableMeetingDates.splice(index, 1);
        }
      })
    })

    this.unavailabilityList.forEach((unavailability) => {
      this.allDates.forEach((date) => {
        let end_date = new Date(date.getTime() + this.duration * 60000);
        let u_begin = new Date(unavailability.begin);
        let u_end = new Date(unavailability.end);

        if (!((date < u_begin && end_date <= u_begin)
          || (date >= u_end && end_date > u_end))) {

          let index = this.availableUnavailabilityDates.indexOf(date);
          this.availableUnavailabilityDates.splice(index, 1);
        }
      })
    })
  }
}
