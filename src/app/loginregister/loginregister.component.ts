import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userInfo } from 'os';
import { UserInfo } from '../Login/user-info';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent implements OnInit {
  loginregister: UserInfo=new UserInfo();
  loginvalue: UserInfo=new UserInfo();
  
  constructor(private addservice:LoginServiceService) { }
  submit:string="";
  id:number;
  department:string;
  pwd:string;
  photo:string;
  usrname:string;
  funvalue:boolean=false;
 
  ngOnInit(): void {
    console.log(this.id)
  }
  
  onSubmit(form: NgForm): void {
    
    if (form.valid ) {
  //  this.loginvalue.id=+this.id
  //  this.loginvalue.department=this.department
  //  this.loginvalue.photo=this.photo;
  //  this.loginvalue.pwd=this.pwd;
  //  this.loginvalue.username=this.usrname;
  //  this.funvalue=true;
console.log(form.value)
      //console.log(form.value)
      console.log(form.value)
      console.log(JSON.stringify(form.value));
    
      this.addservice.createlogin(form.value).subscribe(m => {
        console.log(m);
      
       // console.log(JSON.stringify(m));
        form.resetForm();
        this.submit= "Form is submitted"
        if(this.submit== "Form is submitted") { 
          this.funvalue=false;
      } else{
        this.funvalue=false;
      }
        window.confirm("Form is submitted")
    
        
      })
      }else{
        window.confirm("Fill the required field")
      }}}
      
