import { UserService } from 'src/app/service/user.service';
import { User } from '../../model/user';
import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/service/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public role: string | null | undefined;

  constructor(private logoutService: LogoutService,private User:UserService,private route:Router) { }

  ngOnInit(): void {
  }


  mycart(){
    if(this.User.isLoggedin ==true)
    {
      this.route.navigate(["cart"]);
    }
    else{
      window.alert("Cart is Accessible Only After LoggingIn.PleaseLogin To Continue...ReDirecting to log In Page")
      this.route.navigate(["login"])
    }
  }

  public logout() {
    if(this.User.isLoggedin==true)
    {
      this.User.isLoggedin=false
    window.alert("You Have Been SuccessFully Logged Out!! Thank you for visiting this page")
    this.logoutService.logout();
    }
    else{
      window.alert("No User Is Currently Logged In");
    }
    
  }
}
