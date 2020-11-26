import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { Location} from '@angular/common';
import { Employeedetails } from 'src/app/EmployeesDetail/employeedetails';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  @Input() id: number;

  employees: Employeedetails[];
  funvalue:boolean=true;
  employee: Employeedetails = new Employeedetails();
  constructor(private employeeService: LoginServiceService, private activatedRoute: ActivatedRoute, private location: Location,private routes :Router) { }

  ngOnInit(): void {
    this.employeeService.getEmployeesList().subscribe(s=> 
      {    if(s && this.funvalue) { 
        this.funvalue=false;
    } 
        this.employees = s;
        this.getEmployee(this.employees);
      } );
  }

  getEmployee(employeeList: Employeedetails[]): void  {
    const empId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.employee = employeeList.find(m=> m.id == empId);
    console.log(this.employee)
  }

  GoBackToList()
  {
    this.location.back();
  }

  Delete(data:Employeedetails):void
  {
    const confirm =window.confirm("Are you Sure want to delete?")
    if(confirm){
    this.employeeService.deletee(data.id).subscribe(res=>{
      console.log(res);
 
    })}
    this.location.back();
  }


}
