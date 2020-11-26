import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserInfo } from '../Login/user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  userinfo:UserInfo;
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot): boolean {

    this.userinfo = JSON.parse(localStorage.getItem('idd'));
      console.log(this.userinfo);
      if ((this.userinfo.logintype == "user")||(this.userinfo.logintype == "admin")||(this.userinfo.logintype == "superadmin")) {
        return true;
      } else {
        return false;
      }}

  constructor() { }
}
