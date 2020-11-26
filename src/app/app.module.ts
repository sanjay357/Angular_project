import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule}from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { from } from 'rxjs';
import { EmployeesDetailComponent } from './EmployeesDetail/employees-detail/employees-detail.component';
import{MatSortModule}from '@angular/material/sort';
import { EmployeedetailsComponent } from './EmployeeDetails/employeedetails/employeedetails.component';
import { AuthguardService } from './service/authguard.service';
// MDB Angular Free
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { AddEmployeeComponent } from './add-employee/add-employee.component'
import { LoginServiceService } from './service/login-service.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UpdateComponent } from './update/update.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { AdminService } from './service/admin.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EmployeesDetailComponent,
    EmployeedetailsComponent,
    AddEmployeeComponent,
    UpdateComponent,
    LoginregisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatToolbarModule,MatSidenavModule,MatIconModule,MatInputModule,MatButtonModule,
    MatFormFieldModule,MatDividerModule,MatListModule,MatCardModule,MatTableModule,FormsModule,HttpClientModule,
    MatSortModule,CheckboxModule,ReactiveFormsModule, WavesModule, ButtonsModule, InputsModule,
    IconsModule, CardsModule,MDBBootstrapModule.forRoot(),MatMenuModule,ReactiveFormsModule,MatPaginatorModule,
    MatDialogModule,MatSelectModule,MatDatepickerModule,Ng2SearchPipeModule,MatProgressSpinnerModule,NgxSpinnerModule
  ],
  providers: [AuthguardService,LoginServiceService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
