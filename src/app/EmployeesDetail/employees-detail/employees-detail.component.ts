import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { Employeedetails } from '../employeedetails';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { from } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddEmployeeComponent } from 'src/app/add-employee/add-employee.component';
import { clear } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInfo } from 'src/app/Login/user-info';
import { EmployeeCollection } from 'src/app/employee-collection';

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent implements OnInit, AfterViewInit {
  Employee: Employeedetails[];
  EmployeeList: EmployeeCollection;
  length:number;
  
  

  namee: string;
  Locationn: string;
  idd: number;
  skill: string;
  age: number;
  funvalue: boolean = true;
  loading: boolean = true;
  start:number;
  end:number;

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
   
    this.getEmployees(0,5);
    
    
   
  }
  ngAfterViewInit(){
     this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
}
  



  //getMethod for table
  getEmployees(start ,end) {

    this.idd = null;
    this.Locationn = '';
    this.namee = '';
    this.skill = '';
    this.age = null;
    this.loading = true;
    console.log(PageEvent.length)
   
    this.empservice.getEmployeesList(start, end).subscribe(s => {
      this.loading = false;
      console.log(s);
      this.Employee=s.employees;
      this.length=s.employeeCount;
      
      console.log(this.Employee);
      //this.EmployeeList.length=30;
      this.dataSource = new MatTableDataSource<Employeedetails>(this.Employee);
      this.dataa = new MatTableDataSource<Employeedetails>(this.Employee);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.sort)
      
      
      
       console.log(this.dataSource);
      
     
    })
    
    this.reloadfun();
  }
  pageChanged(event){
    this.loading = true;

    let pageIndex = 1+(event.pageIndex);
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;
    this.end=pageSize*pageIndex;
    console.log(this.end)
    this.start=this.end-pageSize;
    console.log(this.start);

    this.getNextData(previousSize,this.start,pageSize);
  }
  getNextData(previousSize,start, end) {
    

    this.empservice.getEmployeesList(start,end).subscribe(s => {
      this.loading = false;
   console.log(s)
      if (s && this.funvalue) {
        this.hideloader();
      }
      this.Employee=s.employees;
      console.log(this.Employee)
      this.length=s.employeeCount;

      this.dataSource = new MatTableDataSource<Employeedetails>(this.Employee);
  
      this.dataa = new MatTableDataSource<Employeedetails>(this.Employee);
      this.dataSource._updateChangeSubscription();
     this.dataa._updateChangeSubscription();
      this.dataSource.sort=this.sort;
       console.log(this.dataSource.data);
    
      
    })
    
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

  hideloader() {

    // Setting display of spinner 
    // element to none 
    this.funvalue = false
  }
  search() {
    this.age = null;
    this.idd = null
    console.log(this.namee);
    this.dataa = this.Employee.filter(res => res.name.toLowerCase().match(this.namee.toLowerCase()) && res.location.toLowerCase().match(this.Locationn.toLowerCase()) && res.skill.toLowerCase().match(this.skill.toLowerCase())
    )
    // this.dataa=this.EmployeeList.filter(m=s>m.Name==this.namee && m.Location==this.Locationn)



    console.log(this.dataa);
    this.dataSource = this.dataa;
    
  }
  reloadfun() {
    var a = localStorage.getItem('i')
    if (a == "Y") {
      location.reload();
      localStorage.setItem("i", 'N')
    }
  }
 
  searchId() {

    this.Locationn = '';
    this.namee = '';
    this.skill = '';
    this.age = null;
    console.log(this.idd);
    this.dataa = this.Employee.filter(m => {
      return m.id == this.idd;
    })
    this.dataSource = this.dataa;
   

  }
  searchage() {
    this.idd = null;
    this.Locationn = '';
    this.namee = '';
    this.skill = '';

    console.log(this.age);
    this.dataa = this.Employee.filter(m => {
      return m.age == this.age;
    })
    this.dataSource = this.dataa;
  //  if (this.dataSource.paginator) {
  //    this.dataSource.paginator.firstPage();
  //  }

  }


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
