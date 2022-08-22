import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Logindata } from './logindata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logindata?:any;
  messageOnSubmit:any;
  isloggedin:boolean | undefined;


  constructor(private userService :UserService , private route:Router) {
    window.localStorage.clear();
   }

   loginFormGroup = new FormGroup({
    "emailId": new FormControl('',[Validators.required , Validators.email]),
    "password": new FormControl('',[Validators.required,Validators.minLength(4)])
  });
  
  
  loginCheck(){
    // console.log(this.loginFormGroup.value);
    // storing form data into the model class
    this.logindata= this.loginFormGroup.value;
    console.log(this.logindata);
    this.userService.login(this.logindata).subscribe(
      response => {
        console.log("Login Success message : ");
        console.log(response);
        this.messageOnSubmit = response.message;
        window.localStorage.setItem('tgt', response.token);
        window.localStorage.setItem('tgt_email', response.emailId);
        window.localStorage.setItem('tgt_role',response.userRole);   
        window.alert(this.messageOnSubmit)
        this.route.navigate(["vehicles"])
      },
      error => {
        console.log("Login error message : ");
        console.log(error);
        this.messageOnSubmit = "Invalid Creedentials Entered";
        window.alert(this.messageOnSubmit);
        return;
      }
    );
  }

  get password() {
    return this.loginFormGroup.get('password')
  }

  get emailId() {
    return this.loginFormGroup.get('emailId')
  }
  ngOnInit(): void {
  }

}
