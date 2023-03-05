import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/models/AuthResponse';
import { AuthService } from 'src/services/auth.service';

import { init_animation } from '../animations/animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: init_animation(2000, 1000, 100, ["fade_logo", "fade_user", "fade_pass", "fade_buttons"])
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password1 = new FormControl('', [Validators.required, Validators.min(8)]);
  password2 = new FormControl('', [Validators.required, Validators.min(8)]);

  is_manual_mode = false
  register_mode = false
  state = 'init';

  errors = ""

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.is_logged_in.subscribe(value => {
      if (value && !this.is_manual_mode) this.router.navigate(["/todoz"])
    })
  }

  witch_mode() {
    this.register_mode = !this.register_mode
  }

  register() {
    this.is_manual_mode = true

    const name = this.name;
    const email = this.email;
    const password1 = this.password1;
    const password2 = this.password2;

    if (name && email && password1 && password2) {
      if (name.value && email.value && password1.value && password2.value) {
        if ( password1.value === password2.value){
          this.auth.register(name.value, email.value, password1.value).subscribe((response) => {
            if (response.data) {
              this.auth.log_user_in(response.data.token)
              this.state = "logged_in"
            }
          }, (err:any) => {
            const error:AuthResponse = err.error
            this.errors = ""
            if (error.errors.name) error.errors.name.map(e => this.errors += e + "\n")
            if (error.errors.email) error.errors.email.map(e => this.errors += e + "\n")
            if (error.errors.password) error.errors.password.map(e => this.errors += e + "\n")
          })
        }
      } 
    }
  }

  login() {
    this.is_manual_mode = true
    if (this.username.valid && this.password.valid) {
      if (this.username.value && this.password.value) {
        this.auth.login(this.username.value, this.password.value)
        this.state = "logged_in"
      }
    }
  }

  toggleState() {
  }

  reRoute() {
    if (this.state === "logged_in") {
      this.router.navigate(["todoz"])
    }
  }
}
