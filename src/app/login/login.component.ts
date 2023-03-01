import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { init_animation } from '../animations/animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: init_animation(2000, 1000, 100, ["fade_logo", "fade_user", "fade_pass", "fade_buttons"])
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');
  state = 'init';

  constructor(private router:Router) {}

  ngOnInit(): void {

  }

  register() {

  }

  login() {
    this.state = "logged_in"
    console.log(this.state)
  }

  toggleState() {
  }

  reRoute() {
    if (this.state === "logged_in") {
      this.router.navigate(["todoz"])
    }
  }
}
