package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Company;
import com.example.demo.repository.CompanyRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/v1")
public class CompanyController {
	
	@Autowired
	private CompanyRepository repository;
	
	@GetMapping("/company")
	public List<Company> getCompany(){
		 return repository.findAll();
		
	}
	
	@PostMapping("/company")
	public void addCompany(@RequestBody Company company){
		repository.save(company);
	}
	
	@PutMapping("/company")
	public void updateCompany(@RequestBody Company company){
		repository.save(company);
	}
	
	@DeleteMapping("/company")
	public void deleteCompany(@RequestBody int comId) {
		repository.deleteById(comId);
	}

}
