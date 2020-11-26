import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { Employeedetails } from '../employeedetails';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { from } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { AddEmployeeComponent } from 'src/app/add-employee/add-employee.component';
import { clear } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInfo } from 'src/app/Login/user-info';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit {
  EmployeeList: Employeedetails[];

  namee: string;
  Locationn: string;
  idd: number;
  skill: string;
  age: number;
  funvalue: boolean = true;
 


  Name1: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: String[] = ['id', 'name', 'location', 'skill', 'age', 'options'];
  dataSource: MatTableDataSource<Employeedetails>
  dataa: any;
  userinfo: UserInfo;




  constructor(private routes: Router, private empservice: LoginServiceService, private SpinnerService: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.getEmployees();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;



  }
  clearall() {
    this.idd = null;
    this.Locationn = '';
    this.namee = '';
    this.skill = '';
    this.age = null;
  }
  getEmployees() {

    this.idd = null;
    this.Locationn = '';
    this.namee = '';
    this.skill = '';
    this.age = null;

    this.empservice.getEmployeesList().subscribe(s => {
      if (s && this.funvalue) {
        this.hideloader();
      }
      this.EmployeeList = s;
      this.dataSource = new MatTableDataSource<Employeedetails>(this.EmployeeList);
      this.dataa = new MatTableDataSource<Employeedetails>(this.EmployeeList);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


    })
    this.reloadfun();


  }


  admin() {
    this.userinfo = JSON.parse(localStorage.getItem('idd'));
    console.log(this.userinfo);
    if (this.userinfo.logintype == "admin") {
    
      return true;
    } else {
      return false;
    }
  }
  superadmin() {
    this.userinfo = JSON.parse(localStorage.getItem('idd'));
    console.log(this.userinfo);
    if (this.userinfo.logintype == "superadmin") {
   
      return true;
    } else {
      return false;
    }
  }
 
  hideloader() {

    // Setting display of spinner 
    // element to none 
    this.funvalue = false
  }
  search() {
    this.age = null;
    this.idd = null
    console.log(this.namee);
    this.dataa = this.EmployeeList.filter(res => res.name.toLowerCase().match(this.namee.toLowerCase()) && res.location.toLowerCase().match(this.Locationn.toLowerCase()) && res.skill.toLowerCase().match(this.skill.toLowerCase())
    )
    // this.dataa=this.EmployeeList.filter(m=s>m.Name==this.namee && m.Location==this.Locationn)



    console.log(this.dataa);
    this.dataSource = this.dataa;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  reloadfun() {
    var a = localStorage.getItem('i')
    if (a == "Y") {
      location.reload();
      localStorage.setItem("i", 'N')
    }
  }
  // searchlocation(){
  //   console.log(this.Locationn);
  //   this.dataa=this.EmployeeList.filter(res=>{
  //     return res.Location.toLowerCase().match(this.Locationn.toLowerCase()); 
  //   })
  //   this.dataSource =this.dataa;
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  searchId() {

    this.Locationn = '';
    this.namee = '';
    this.skill = '';
    this.age = null;
    console.log(this.idd);
    this.dataa = this.EmployeeList.filter(m => {
      return m.id == this.idd;
    })
    this.dataSource = this.dataa;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  searchage() {
    this.idd = null;
    this.Locationn = '';
    this.namee = '';
    this.skill = '';

    console.log(this.age);
    this.dataa = this.EmployeeList.filter(m => {
      return m.age == this.age;
    })
    this.dataSource = this.dataa;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
  // searchSkills(){
  //   console.log(this.skill);
  //   this.dataa=this.EmployeeList.filter(m=>{
  //     return m.Skill.toLowerCase().match(this.skill.toLowerCase()); 
  //   })
  //   this.dataSource =this.dataa;
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }

  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public highlightSelectedRow(row): void {
    this.routes.navigate(['three', row.id]);
  }
  Delete(data: Employeedetails): void {
    const confirm = window.confirm("Are you Sure want to delete?")
    if (confirm) {
      this.empservice.deletee(data.id).subscribe(res => {
        console.log(res);
        this.getEmployees()
        location.reload();

      })
    }
  }
  public edit(item): void {
    console.log(item)
    this.routes.navigate(['five'])
    localStorage.setItem('editdata', JSON.stringify(item))

  }



}
