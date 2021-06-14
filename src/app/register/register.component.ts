import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { LoginView } from '../models/login-view.model';
import { RegisterView } from '../models/register-view.model';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  gender : any;
  registerData: FormGroup;
  notSame = true;
  public isSubmitted = false;
  error = "";

  constructor(private fb: FormBuilder, private authService : AuthService, private profileService : ProfileService, private router: Router) {
    this.registerData = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      gender : ['Male', Validators.required],
      password : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      email : ['', Validators.required],
      confirmPassword : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
   }), { validator: this.checkPasswords() };
   }

  ngOnInit(): void {
  }

  public register(){
    this.isSubmitted = true;

    
    this.checkPasswords();

    if (this.registerData.invalid) {
      return;
    }


    if (this.notSame)
        return;
        
    let name = this.registerData.controls['name'].value;
    let password = this.registerData.controls['password'].value;
    let confirmPassword = this.registerData.controls['confirmPassword'].value;
    let gender = this.registerData.controls['gender'].value;
    let email = this.registerData.controls['email'].value;

    var view = new RegisterView();
    view.Email = email;
    view.DisplayName = name;
    view.Password = password;
    view.Gender = gender;
    view.ConfirmPassword = confirmPassword;
    
    this.authService.register(view).subscribe(data => {
      this.profileService.PostProfile(view.DisplayName, view.Gender,data.response).subscribe(data => {
        this.router.navigateByUrl('/login');
      }, error => {
        console.log(error.status);
        if (error.statusText == "Unknown Error")
        this.error ="We are currently experiencing problems. Try again later." 
        if (error.status == 502)
        this.error = "We are currently experiencing problems. Try again later."
        if (error.status == 400)
        this.error = error.error
      });
      
     
    }, error => {
      console.log(error.status);
      if (error.statusText == "Unknown Error")
      this.error ="We are currently experiencing problems. Try again later." 
      if (error.status == 502)
      this.error = "We are currently experiencing problems. Try again later."
      if (error.status == 400)
      this.error = error.error
   
    });

  }

  checkPasswords() { // here we have the 'passwords' group

  if(this.registerData != null){
    let pass = this.registerData.controls['password'].value;
    let confirmPass =this.registerData.controls['confirmPassword'].value;
    console.log(this.notSame)
    if(pass == confirmPass){
      console.log("HEY")
      this.notSame = false;
    }else{
    this.notSame = true;
    }   
  }
  
   
  }

}
