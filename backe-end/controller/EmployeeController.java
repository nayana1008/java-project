package com.example.demo.controller;

import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Company;
import com.example.demo.model.Department;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/v1")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository repository;
	
	@GetMapping("/employee")
	public List<Employee> getEmployee(){
		 return repository.findAll();
		
	}
	
	@PostMapping("/employee")
	public void addEmployee(@RequestBody Employee employee){
		repository.save(employee);
	}
	
	@PutMapping("/employee")
	public void updateEmployee(@RequestBody Employee employee){
		repository.save(employee);
	}
	
	@DeleteMapping("/employee")
	public void deleteEmployee(@RequestBody int comId) {
		repository.deleteById(comId);
	}
	
public static void readDept(String company) {
		
		Configuration con = new Configuration().configure().addAnnotatedClass(Employee.class);
	    SessionFactory sf = con.buildSessionFactory();
        Session session = sf.openSession();
        Transaction transaction = session.beginTransaction();
        Query q = session.createQuery("SELECT  department,count(*) as No FROM Employee e where e.company = :company group by department");
        q.setParameter("company", company);
        List companyList=q.getResultList();
        transaction.commit();
        session.close();
		//return companyList.get(0);
		
	}

}
