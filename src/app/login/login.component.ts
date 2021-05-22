import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });
  }
  get f() { return this.loginForm.controls; }
  ngOnInit(): void {
  }

  moveOn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.changeMessage(this.loginForm.get("email")?.value)
    console.log(this.userService.getMessage().value);
    this.router.navigateByUrl('/menu');
  }



}
