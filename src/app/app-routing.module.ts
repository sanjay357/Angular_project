import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HttpClient}from '@angular/common/http';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { EmployeesDetailComponent } from './EmployeesDetail/employees-detail/employees-detail.component';
import { EmployeedetailsComponent } from './EmployeeDetails/employeedetails/employeedetails.component';
import { AuthguardService } from './service/authguard.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateComponent } from './update/update.component';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { AdminService } from './service/admin.service';


const routes: Routes = [
  {path:'one',component:LoginPageComponent },
  {path:'two',component:EmployeesDetailComponent,canActivate: [AuthguardService]},
  {path:'three',component:EmployeedetailsComponent,canActivate: [AuthguardService]},
  {path: 'three/:id', component: EmployeedetailsComponent,canActivate: [AuthguardService]},
  {path: 'five', component: UpdateComponent,canActivate: [AdminService]},
  {path:'four',component:AddEmployeeComponent,canActivate: [AdminService]},
  {path:'register',component:LoginregisterComponent,canActivate: [AdminService]},
  {path: '', redirectTo: '/one', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
