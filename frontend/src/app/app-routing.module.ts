import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamProjectComponent } from './team-project/team-project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { UnavailabilityComponent } from './unavailability/unavailability.component';
import { SetMeetingComponent } from './set-meeting/set-meeting.component';
import { MeetingDatesComponent } from './meeting-dates/meeting-dates.component';
import { TeamUsersComponent } from './team-users/team-users.component';
import { TeamDetailsComponent } from './team-details/team-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'task-list/:id', component: TaskListComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'create-task/:id', component: CreateTaskComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'schedule/:id', component: ScheduleComponent },
  { path: 'create-team', component: CreateTeamComponent },
  { path: 'associate-team-project', component: TeamProjectComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'task-detail/:id', component: TaskDetailComponent },
  { path: 'all-tasks/:id', component: AllTasksComponent },
  { path: 'meetings/:id', component: MeetingsComponent },
  { path: 'set-meeting/:id', component: SetMeetingComponent },
  { path: 'unavailability/:id', component: UnavailabilityComponent },
  { path: 'meeting-dates/:id', component: MeetingDatesComponent },
  { path: 'team-users', component: TeamUsersComponent },
  { path: 'team-details/:id', component: TeamDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
