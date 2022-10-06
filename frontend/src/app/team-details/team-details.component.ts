import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../user';
import { Team } from '../team';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  @Input() user?: User;
  @Input() team?: Team;

  availableUsers: User[] = [];
  associatedUsers: User[] = [];

  selectedUser: string = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.teamService.getTeam(_id).subscribe(team => {
      this.team = team
      this.getAvailableUsers();
    });
  }

  getAvailableUsers(): void {
    this.associatedUsers = [];
    this.availableUsers = [];

    this.userService
      .getUsers()
      .subscribe((users) => this.setAvailableUsers(users));
  }

  setAvailableUsers(users: User[]): void {
    users.forEach((user) => this.aux(user));
  }

  aux(user: User): void {
    if (this.team) {
      if (this.team.users_id.indexOf(user._id) === -1) {
        this.availableUsers.push(user);
      } else {
        this.associatedUsers.push(user);
      }
    }
  }

  setUser(user: string): void {
    this.selectedUser = user;
  }

  addUser(): void {
    if (this.team) {
      this.selectedUser = this.selectedUser.trim();
      if (!this.selectedUser || this.selectedUser === '') {
        return;
      }

      this.team.users_id.push(this.selectedUser);
      this.teamService.updateTeam(this.team).subscribe(team => {
        this.team = team;
        this.ngOnInit()
      });
    }
  }

  removeUser(user: User): void {
    this.user = user;
    if (this.team) {
      var index = this.team.users_id.indexOf(this.user._id);
      if (index > -1) {
        this.team.users_id.splice(index, 1);
      }
      this.teamService
        .updateTeam(this.team)
        .subscribe(team => {
          this.team = team;
          this.ngOnInit()
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
