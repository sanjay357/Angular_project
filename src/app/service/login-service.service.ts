import { Injectable } from '@angular/core';
import { from, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from 'src/app/Login/user-info'
import { Observable } from 'rxjs';
import { Employeedetails } from '../EmployeesDetail/employeedetails';
import { $ } from 'protractor';
import { EmployeeCollection } from '../employee-collection';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
private readonly url:string='https://localhost:44347/api/Employee';
  constructor(private http:HttpClient) {}

  private  baseUrl='https://localhost:44347/api/Employee';
 getUserInfo():  Observable<UserInfo[]>
    {
      return this.http.get<UserInfo[]>('https://localhost:44347/api/Login');
    }
    getEmployeesList( start,end):Observable<EmployeeCollection>{
      return this.http.get<EmployeeCollection>('https://localhost:44347/api/Employee?start=' +start +'&end='+end);

    }
    getEmployeesListbyid(id):Observable<Employeedetails[]>{
      return this.http.get<Employeedetails[]>(this.baseUrl+ "/" + id);

    }
    createlogin(form :UserInfo):Observable<UserInfo>

    {//const headers = { 'content-type': 'application/json'}
      return this.http.post<UserInfo>( "https://localhost:44347/api/Login",form,{headers: new HttpHeaders({'content-type':'application/json'})});
    }

   create(form :Employeedetails):Observable<Employeedetails>
   {
     return this.http.post<Employeedetails>( this.url,form,{headers: new HttpHeaders({'content-type':'application/json'})});
     //,{headers: new HttpHeaders({'content-type':'application/json'})}
   }
   deletee(id:any):Observable<Employeedetails>
   {
     return this.http.delete<Employeedetails>(this.url + "/" + id)
   }
   update(form :Employeedetails):Observable<Employeedetails>
   {
     return this.http.put<Employeedetails>( `${this.url}/${form.id}`,form);
   }
}
