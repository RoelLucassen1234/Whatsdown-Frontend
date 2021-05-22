import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor( private fb: FormBuilder, private userService : UserService, private router: Router) { 
    this.loginForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl()
   });
  }

  ngOnInit(): void {
  }

  moveOn(){
    this.userService.changeMessage(this.loginForm.get("email")?.value)
    console.log(this.userService.getMessage().value);
    this.router.navigateByUrl('/menu');
  }

}
