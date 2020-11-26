import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { UserInfo } from 'src/app/Login/user-info';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  users: UserInfo[];
  userName: string;
  passWord: string;
  status: string;
  idd: UserInfo[];
  funvalue:boolean=true;


  constructor(private route: Router, private loginService: LoginServiceService) {
    this.loggedinn()
  }
  isAuthorizedUser: string = 'N';


    ngOnInit()  {
    this.loginService.getUserInfo().subscribe(s => {
        if(s && this.funvalue) { 
        this.funvalue=false;
    } 
      this.users = s
    console.log(s)});


    this.status = '';


  }

  ValidateUser(): void {


    var count = this.users.filter(m => m.username == this.userName && m.pwd == this.passWord).length;

    if (count > 0) {
      this.isAuthorizedUser = 'Y';
      localStorage.setItem('userStatus', this.isAuthorizedUser);
      localStorage.setItem('i', this.isAuthorizedUser);

      console.log(localStorage.getItem('userStatus'));
      // location.reload();

      this.route.navigate(['two']);

    


      localStorage.setItem('idd', JSON.stringify(this.users.find(res => {
        return res.username.match(this.userName) && res.pwd.match(this.passWord);
      })))


      this.status = '';

    }
    else {
      this.isAuthorizedUser = 'N';
      localStorage.setItem('userStatus', this.isAuthorizedUser);
      this.route.navigate(['one']);
      this.status = "User has no Access!";
      localStorage.setItem('idd', null)
    }
  }
  loggedinn(): boolean {
    var status = localStorage.getItem('userStatus');


    if (status == 'Y') {
      return true;
    }

    else {
      return false;
    }
  }
}
