import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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


  constructor(private fb: FormBuilder) {
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

    console.log(name);
    console.log(password);
    console.log(confirmPassword);
    console.log(gender);
    console.log(email);

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
