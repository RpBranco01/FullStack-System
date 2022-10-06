import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../meeting';
import { MeetingService } from '../meeting.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-meeting-dates',
  templateUrl: './meeting-dates.component.html',
  styleUrls: ['./meeting-dates.component.css']
})
export class MeetingDatesComponent implements OnInit {

  availableDates: Date[] = [];
  @Input() meeting?: Meeting;

  constructor(
    private location: Location,
    private meetingService: MeetingService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.meetingService.getMeeting(_id).subscribe(meeting => {
      this.meeting = meeting
      this.meeting.available_dates.forEach(date =>
        this.getDates(date)
      )
    });
  }

  getDates(date: Date) {
    let d = new Date(date);
    this.availableDates.push(d);
  }

  chooseDate(date: Date): void {
    if (this.meeting) {
      let end = new Date(date.getTime() + this.meeting.duration * 60000)
      let begin = date;
      this.meeting.begin = begin;
      this.meeting.end = end;
      this.meetingService.updateMeeting(this.meeting).subscribe(() => {
        alert('Reunião definida');
        this.location.back();
      })
    }

  }

  goBack(): void {
    if (this.meeting) {
      this.meetingService.removeMeeting(this.meeting._id).subscribe(meeting => this.location.back());
    }
  }

}
