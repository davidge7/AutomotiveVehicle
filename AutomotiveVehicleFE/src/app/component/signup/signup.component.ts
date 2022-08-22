import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Signupdata } from './signupdata';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupdata: Signupdata | undefined;
  messageOnSubmit:any;
  
  constructor(private userservice: UserService, private router: Router) { }

  signupFormGroup = new FormGroup ({
    userName: new FormControl(''),
    emailId: new FormControl('',[Validators.required ,Validators.email]),
    password: new FormControl('',[Validators.required ,Validators.minLength(4)]),
  });

  sendSignupData() {
    // console.log(this.signupFormGroup.value);
    //storing form data into the model class
    this.signupdata = this.signupFormGroup.value;
    console.log(this.signupdata);
    this.userservice.signup(this.signupdata).subscribe(
      response => {
        console.log("User registration success : ")
        console.log(response);
        this.messageOnSubmit = "Your account has been created successfully. Please login to continue";
        window.alert(this.messageOnSubmit);
        this.router.navigate(["login"])
       
      },
      error => {
        console.log("error message : signup Unsuccessfull");
        console.log(error);
        this.messageOnSubmit ="Signup unsuccessFull.Please Try With Different Email";
        window.alert(this.messageOnSubmit);
        return
      }
    );
  }

  ngOnInit(): void {
  }

  get userName() {
    return this.signupFormGroup.get("userName");
  }
  get emailId() {
    return this.signupFormGroup.get('emailId')
  }
  get password() {
    return this.signupFormGroup.get('password')
  }

}
