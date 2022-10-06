import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamProjectComponent } from './team-project/team-project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TopBarLoginComponent } from './top-bar-login/top-bar-login.component';
import { TopBarLogoutComponent } from './top-bar-logout/top-bar-logout.component';
import { TopBarHomeComponent } from './top-bar-home/top-bar-home.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { UnavailabilityComponent } from './unavailability/unavailability.component';
import { SetMeetingComponent } from './set-meeting/set-meeting.component';
import { MeetingDatesComponent } from './meeting-dates/meeting-dates.component';
import { TeamUsersComponent } from './team-users/team-users.component';
import { TeamDetailsComponent } from './team-details/team-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    HomeComponent,
    AdminComponent,
    CreateUserComponent,
    CreateTaskComponent,
    CreateProjectComponent,
    CreateTeamComponent,
    TeamProjectComponent,
    ProjectDetailComponent,
    ScheduleComponent,
    TopBarLoginComponent,
    TopBarLogoutComponent,
    TopBarHomeComponent,
    TaskDetailComponent,
    AllTasksComponent,
    MeetingsComponent,
    UnavailabilityComponent,
    SetMeetingComponent,
    MeetingDatesComponent,
    TeamUsersComponent,
    TeamDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [SetMeetingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
