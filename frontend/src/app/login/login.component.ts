import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, SelectMultipleControlValueAccessor } from '@angular/forms';
import { LoginService } from '../login.service';

import { User } from '../user'
import { Admin } from '../admin';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() user?: User;
  users: User[] = [];
  admins: Admin[] = [];

  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getAdmins();
    this.getUsers();

  }

  getAdmins(): void {
    this.loginService.getAdmins()
      .subscribe(admins => this.admins = admins);
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  // TODO: onSubmit check if boolean or void
  onSubmit(): void {
    if (this.verifyAdmin()) {
      this.router.navigate(['./admin']);
    }
    else {
      this.userService.getUser(this.loginForm.controls['username'].value).subscribe(user => this.checkUser(user));
    }
  }

  checkUser(user: User): void {
    this.user = user

    if (this.user && this.verifyLogin(this.user.username, this.user.password)) {
      this.router.navigate([`./task-list/${this.user._id}`]);
    }
    else {
      window.alert("Erro no login!");
    }
  }


  verifyAdmin(): boolean {
    let inputUsername = this.loginForm.controls['username'].value
    let inputPassword = this.loginForm.controls['password'].value

    return (inputUsername === 'admin' && inputPassword === 'admin');
  }

  verifyLogin(username: String, password: String): boolean {
    let inputUsername = this.loginForm.controls['username'].value
    let inputPassword = this.loginForm.controls['password'].value

    return (inputUsername === username && inputPassword === password)
  }
}