import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logindata } from '../component/login/logindata';
import { Signupdata } from '../component/signup/signupdata';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  userAuthenticationBaseUrl: string="http://localhost:9000/api/v1";
  userAutomobilesMongodbBaseUrl: string="http://localhost:9000/api/v2";

  isLoggedin : boolean | any ;
  
  signup(signupdata: Signupdata) {
    return this.httpClient.post<any>(this.userAutomobilesMongodbBaseUrl+"/register",signupdata);
  }


  login(logindata: any){
    this.isLoggedin=true;
    return this.httpClient.post<any>(this.userAuthenticationBaseUrl+"/login",logindata);
  }

  loggedin(){
    return !!localStorage.getItem('token');
  }

  getAllUsers() {
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.get<any>(this.userAutomobilesMongodbBaseUrl+"/getallusers", {'headers':reqHeader});
  }

  updateUserProfile(formData: FormData) {
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('tgt'));
    this.httpClient.post<any>(this.userAutomobilesMongodbBaseUrl+ "/updateuserprofile", formData, {'headers':reqHeader}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
