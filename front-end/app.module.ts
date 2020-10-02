import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PreviewComponent } from './preview/preview.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';
import { AppRoutingModule } from './app-routing.module';
import { AgGridModule} from 'ag-grid-angular';
@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    DepartmentComponent,
    EmployeeComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
