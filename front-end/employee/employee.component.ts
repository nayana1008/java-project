import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RowNode } from 'ag-grid-community';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: Employee={employeeId:0,employeeName:'',age:0,gender:'',doj:'',department:'',company:''};
  gridApi: any;
  columnApi: any;
  baseURL = 'http://localhost:8080/api/v1/employee';
  rowData:any;
  selectedNodes:RowNode[];
  editableNodes: RowNode[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Employee[]>(this.baseURL).subscribe((employee: Employee[])=>{
      // this.customers.push(customer);
      this.rowData=employee;
   });
  }

  columnDefs = [
    { headerName: 'Employee ID', field: 'employeeId', editable: false },
    { headerName: 'Employee Name', field: 'employeeName', editable: true },
    { headerName: 'Age', field: 'age', editable: true },
    { headerName: 'Gender', field: 'gender', editable: true },
    { headerName: 'DOJ', field: 'doj', editable: true },
    { headerName: 'Department', field: 'department', editable: true },
    { headerName: 'Company', field: 'company', editable: true }];

  rowSelection = 'single';

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

  }

  onRowSelected(event) {
    if (event.node.selected) {
      this.selectedNodes = event.node.data;
    }
    console.log(this.selectedNodes);
  }

  getId(params){
    this.employee.employeeId=params.target.value;

  }

  getName(params){
    this.employee.employeeId=params.target.value;
  }

  getAge(params){
    this.employee.age=params.target.value;
  }

  getGender(params){
    this.employee.gender=params.target.value;
  }

  getDoj(params){
    this.employee.doj=params.target.value;
  }

  getCompany(params){
    this.employee.company=params.target.value;
  }

  getDepartment(params){
    this.employee.department=params.target.value;
  }

  addEmployee(){
    this.http.post(this.baseURL,this.employee).subscribe((customer: Employee)=>{
      //this.rowData=customer;
   });
  }

  editEmployee(){
    this.gridApi.updateRowData({
      edit: [{ employeeId: this.editableNodes['employeeId'], 
      employeeName: this.editableNodes['employeeName'], 
      age: this.editableNodes['age'], 
      gender: this.editableNodes['gender'],doj: this.editableNodes['doj'],
      department: this.editableNodes['department'],company: this.editableNodes['company'] }]
    });
    this.http.put(this.baseURL,{"employeeId":this.editableNodes['employeeId'], 
                        "employeeName":this.editableNodes['employeeName'], 
                        "age":this.editableNodes['age'],
                      "gender":this.editableNodes['gender'],
                      "doj":this.editableNodes['doj'],"department":this.editableNodes['department'],
                      "company":this.editableNodes['company']}).subscribe(data=>{
       });
  }

  deleteEmployee(){
    const selectedRow = this.gridApi.getSelectedRows();
    if(selectedRow.length!=0){
      this.gridApi.applyTransaction({ remove: selectedRow });
      // const deletecompany: Company={companyId:selectedRow[0].companyId,
      //         companyName:selectedRow[0].companyName,
      //         companyCode:selectedRow[0].companyCode,
      //         companyAddress:selectedRow[0].comp};
      const empId=selectedRow[0].employeeId;
      this.http.delete(this.baseURL,empId).subscribe(data=>{});
    } else {
      console.log('Please select a row to delete');
    }
  }

  cancel(){}

  onCellValueChange(params){
    const newValue = params.newValue;
    const field = params.colDef.field;
    this.editableNodes = this.selectedNodes;
    this.editableNodes[field] = newValue;
    
  }

}
