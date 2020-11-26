import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employeedetails } from '../EmployeesDetail/employeedetails';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  employee: Employeedetails;
  emp :Employeedetails=new Employeedetails();
  submit:string;
  
  constructor(private createservice: LoginServiceService, router:Router) { 
    this.employee=JSON.parse(localStorage.getItem('editdata'))
    console.log(this.employee)
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      // this.emp.id=+form.value.id
      // this.emp.address=form.value.address
      // this.emp.phoneNumber=+form.value.phoneNumber
      // this.emp.age=+form.value.age
      // this.emp.email=form.value.email
      // this.emp.location=form.value.location
      // this.emp.managerName=form.value.managerName
      // this.emp.name=form.value.name
      // this.emp.salary=form.value.salary
      // this.emp.skill=form.value.skill
      // this.emp.srccs=form.value.srccs


      console.log(form.value)
      this.createservice.update(form.value).subscribe(m => {
        console.log(m);
      //  form.resetForm();
        this.submit= "Form is updated"
        window.confirm("The form is updated")
      
        
      })}

      else{
        window.confirm("Please fill the required field")
      }
  }

}