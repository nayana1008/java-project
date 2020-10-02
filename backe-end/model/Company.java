package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="companies")
public class Company {

	@Id
	@Column(name="company_id")
	private int companyId;
	@Column(name="company_name")
	private String companyName;
	@Column(name="company_code")
	private String companyCode;
	@Column(name="company_address")
	private String companyAddress;
	
	public Company() {
		
	}
	
	public Company(String companyName, String companyCode, String companyAddress) {
		super();
		this.companyName = companyName;
		this.companyCode = companyCode;
		this.companyAddress = companyAddress;
	}
	public int getCompanyId() {
		return companyId;
	}
	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
}
