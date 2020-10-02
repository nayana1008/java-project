package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="departments")
public class Department {
	
	 
	@Id
	 @Column(name="department_id")
	 private int departmentId;
	 @Column(name="department_name")
	 private String departmentName;
	 @Column(name="department_code")
	 private String departmentCode;
	 @Column(name="company_name")
	 private String companyName;
	 
	 
	 public Department() {
		 
	 }
	 
	 public Department(String departmentName, String departmentCode, String companyName) {
		super();
		this.departmentName = departmentName;
		this.departmentCode = departmentCode;
		this.companyName = companyName;
	}
	 
	public int getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getDepartmentCode() {
		return departmentCode;
	}
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	@Override
	public String toString() {
		return "Department [departmentId=" + departmentId + ", departmentName=" + departmentName + ", departmentCode="
				+ departmentCode + ", companyName=" + companyName + "]";
	}
	

}
