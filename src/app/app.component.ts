import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { UserInfo } from './Login/user-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  s: UserInfo;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  title = 'Loginpage';
  showLoadingIndicator = true;
  userinfo:UserInfo;
  constructor(private route: Router, private dialog: MatDialog, private router: Router) {
  
    this.router.events.subscribe((RouterEvent: Event) => {
      if (RouterEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (RouterEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    });
    this.loggedinn();

    this.jsoncard();
   
  }

  Logout(): void {
    localStorage.clear();
    localStorage.removeItem('idd');
    this.route.navigate(['/one']);
    localStorage.setItem('idd', null);



  }
  // openDialog() {
  //   this.dialog.open(DialogboxComponent);

  // }
  loggedinn(): boolean {
    var status = localStorage.getItem('userStatus');


    if (status == 'Y') {
      return true;

    }

    else {
      return false;
    }
  }
  admin() {
    this.userinfo = JSON.parse(localStorage.getItem('idd'));
   // console.log(this.userinfo);
    if (this.userinfo.logintype == "admin") {
    
      return true;
    } else {
      return false;
    }
  }
  superadmin() {
    this.userinfo = JSON.parse(localStorage.getItem('idd'));
    //console.log(this.userinfo);
    if (this.userinfo.logintype == "superadmin") {
   
      return true;
    } else {
      return false;
    }
  }
  ngOnInit(): void { }

  jsoncard() {
    this.s = JSON.parse(localStorage.getItem('idd'));
   // console.log(this.s);

  }

}
