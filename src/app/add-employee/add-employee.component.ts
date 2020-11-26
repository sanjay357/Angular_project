import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employeedetails } from 'src/app/EmployeesDetail/employeedetails';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employeedetails = new Employeedetails();
  submit:string;
  idvalue:number;
  funvalue:boolean=false;




  constructor(private addservice: LoginServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    
    if (form.valid ) {
      //  this.employee.address=form.value.address
      //  this.employee.email=form.value.email
      //    this.employee.id=+form.value.id
      //  this.employee.location=form.value.location
      //  this.employee.managerName=form.value.managerName
      //  this.employee.name=form.value.name
      //  this.employee.phoneNumber=+form.value.phoneNumber
      //  this.employee.salary=+form.value.salary
      //  this.employee.skill=form.value.skill
      //  this.employee.srccs=form.value.srccs
      //  this.employee.age=+form.value.age
      console.log(form.value)
     
      this.addservice.create(form.value).subscribe(m => {
        console.log(m);
     
        form.resetForm();
        this.submit= "Form is submitted"
        if(this.submit== "Form is submitted") { 
          this.funvalue=false;
      } else{
        this.funvalue=false;
      }
        window.confirm("Form is submitted")
        
      })
    }
    else{
      window.confirm("Please fill the required field")
    }
  }
}
