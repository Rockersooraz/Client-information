import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private title: Title, private router: Router) {
    this.title.setTitle('Login');
  }


log = new Login('suraj.adhikari80@gmail.com','12345');

  ngOnInit(): void {
  }

  onSubmit(){
    this.router.navigate(['/client/create-client']);
  }

}
