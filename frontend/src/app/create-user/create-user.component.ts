import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Input() user?: User;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,) { }

  creationForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    let username = this.creationForm.controls['username'].value;
    if ((username.length > 2) && (username.match(/^[0-9a-z]+$/i))) { // check if username is alphanumeric and check length
      this.userService.getUser(this.creationForm.controls['username'].value).subscribe(user => this.checkUser(user));
    }
    else {
      alert('O username tem de ter pelo menos 3 caracteres alfanuméricos');
      this.checkPassword();
    }
  }

  checkUser(user: User): void {
    let bool = true;

    this.user = user

    if (this.user) {
      alert('Esse nome já não se encontra disponível!');
      bool = false;
    }

    if (!this.checkPassword()) {
      bool = false;
    }
    if (bool) {
      this.createUser(this.creationForm.controls['username'].value, this.creationForm.controls['password'].value);
      this.router.navigate(['./admin']);
    }
  }

  checkPassword(): boolean {
    let password = this.creationForm.controls['password'].value;
    let bool = true;
    if (password.length < 8) {
      alert('A senha deve ter oito ou mais caracteres!');
      bool = false;
    }
    if (!/[A-Z]/.test(password)) {
      alert('A senha deve incluir pelo menos uma letra maiúscula!');
      bool = false;
    }
    if (!/[a-z]/.test(password)) {
      alert('A senha deve incluir pelo menos uma letra minúscula!');
      bool = false;
    }
    if (!/[0-9]/.test(password)) {
      alert('A senha deve incluir pelo menos um algarismo!');
      bool = false;
    }
    return bool;
  }

  createUser(username: string, password: string): void {
    username = username.trim();
    password = password.trim();
    let tasks_id: string[] = [];
    if (!username || !password) { return; }
    this.userService.createUser({ username, password } as User).subscribe(user => { this.users.push(user); });
  }
}
