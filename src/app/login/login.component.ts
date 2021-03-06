import { AfterViewChecked, AfterViewInit, Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  error = "";
  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });
  }
  ngAfterViewInit(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': (param: any) => this.googleSignin(param)
  });
  }

  
  ngOnInit(): void {
    if (isDevMode()) {
      console.log(environment.apiUrl)
      console.log('👋 Development!');
    } else {
      console.log('💪 Production!');
    }
  }

  moveOn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.loginViaNormal(this.loginForm.get("email")?.value,this.loginForm.get("password")?.value ).subscribe(data => {
       this.router.navigate(['menu'])
       
    }, error => {
      console.log(error.status)
      if (error.statusText == "Unknown Error")
      this.error ="We are currently experiencing problems. Try again later." 
      if (error.status == 502)
      this.error = "We are currently experiencing problems. Try again later."
      if (error.status == 400)
      this.error = error.error
    })

  }
  get f() { return this.loginForm.controls; }
  
  googleSignin(googleUser : any){
    console.log(googleUser)
    this.authService.loginViaGoogle(googleUser.getAuthResponse().id_token).subscribe(loggedIn => {
      this.router.navigate(['menu'])
    }, error => {
      if (error.statusText == "Unknown Error")
      this.error ="We are currently experiencing problems. Try again later." 
      console.error(error.statusText);
    })
  }

}
