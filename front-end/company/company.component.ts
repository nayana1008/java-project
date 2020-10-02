import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RowNode } from 'ag-grid-community';
import { Company } from '../Company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  company: Company={companyId:0,companyName:'',companyCode:'',companyAddress:''};
  gridApi: any;
  columnApi: any;
  baseURL = 'http://localhost:8080/api/v1/company';
  rowData:any;
  selectedNodes:RowNode[];
  editableNodes: RowNode[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Company[]>(this.baseURL).subscribe((customer: Company[])=>{
     // this.customers.push(customer);
     this.rowData=customer;
  });
  }

  columnDefs = [
    { headerName: 'Company ID', field: 'companyId', editable: false },
    { headerName: 'Company Name', field: 'companyName', editable: true },
    { headerName: 'Company Code', field: 'companyCode', editable: true },
    { headerName: 'Company Address', field: 'companyAddress', editable: true }];

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
    this.company.companyId=params.target.value;

  }

  getName(params){
    this.company.companyName=params.target.value;
  }

  getAddress(params){
    this.company.companyAddress=params.target.value;
  }

  getCode(params){
    this.company.companyCode=params.target.value;
  }

  addCompany(){
    this.http.post(this.baseURL,this.company).subscribe((customer: Company[])=>{
      //this.rowData=customer;
   });
  }

  editCompany(){
    this.gridApi.updateRowData({
      edit: [{ companyId: this.editableNodes['companyId'], companyName: this.editableNodes['companyName'], 
      companyCode: this.editableNodes['companyCode'], companyAddress: this.editableNodes['companyAddress'] }]
    });
    this.http.put(this.baseURL,{"companyId":this.editableNodes['companyId'], 
                        "companyName":this.editableNodes['companyName'], "companyCode":this.editableNodes['companyCode'],
                      "companyAddress":this.editableNodes['companyAddress']}).subscribe(data=>{
       });
  }

  deleteCompany(){
    const selectedRow = this.gridApi.getSelectedRows();
    if(selectedRow.length!=0){
      this.gridApi.applyTransaction({ remove: selectedRow });
      // const deletecompany: Company={companyId:selectedRow[0].companyId,
      //         companyName:selectedRow[0].companyName,
      //         companyCode:selectedRow[0].companyCode,
      //         companyAddress:selectedRow[0].comp};
      const companyId=selectedRow[0].companyId;
      this.http.delete(this.baseURL,companyId).subscribe(data=>{});
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
