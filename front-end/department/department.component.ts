import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RowNode } from 'ag-grid-community';
import { Department } from '../Customer';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {


  department: Department={departmentId:0,departmentName:'',departmentCode:'',companyName:''};
  gridApi: any;
  columnApi: any;
  baseURL = 'http://localhost:8080/api/v1/department';
  rowData:any;
  selectedNodes:RowNode[];
  editableNodes: RowNode[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Department[]>(this.baseURL).subscribe((customer: Department[])=>{
      // this.customers.push(customer);
      this.rowData=customer;
   });
  }

  columnDefs = [
    { headerName: 'Department ID', field: 'departmentId', editable: false },
    { headerName: 'Department Name', field: 'departmentName', editable: true },
    { headerName: 'Department Code', field: 'departmentCode', editable: true },
    { headerName: 'Company Name', field: 'companyName', editable: true }];

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
    this.department.departmentId=params.target.value;

  }

  getName(params){
    this.department.departmentName=params.target.value;
  }

  getCompany(params){
    this.department.companyName=params.target.value;
  }

  getCode(params){
    this.department.departmentCode=params.target.value;
  }

  addDepartment(){
    this.http.post(this.baseURL,this.department).subscribe((department: Department[])=>{
      //this.rowData=customer;
   });
  }

  editDepartment(){
    this.gridApi.updateRowData({
      edit: [{ departmentId: this.editableNodes['departmentId'], 
              departmentName: this.editableNodes['departmentName'], 
              departmentCode: this.editableNodes['departmentCode'], 
              companyName: this.editableNodes['companyName'] }]
    });
    this.http.put(this.baseURL,{"departmentId":this.editableNodes['departmentId'], 
                        "departmentName":this.editableNodes['departmentName'], 
                        "departmentCode":this.editableNodes['departmentCode'],
                      "companyName":this.editableNodes['companyName']}).subscribe(data=>{
       });
  }

  deleteDepartment(){
    const selectedRow = this.gridApi.getSelectedRows();
    if(selectedRow.length!=0){
      this.gridApi.applyTransaction({ remove: selectedRow });
      // const deletecompany: Company={companyId:selectedRow[0].companyId,
      //         companyName:selectedRow[0].companyName,
      //         companyCode:selectedRow[0].companyCode,
      //         companyAddress:selectedRow[0].comp};
      const deptId=selectedRow[0].departmentId;
      this.http.delete(this.baseURL,deptId).subscribe(data=>{});
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
