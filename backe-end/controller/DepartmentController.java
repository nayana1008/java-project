package com.example.demo.controller;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Department;
import com.example.demo.repository.DepartmentRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/v1")
public class DepartmentController {
	
	@Autowired
	private DepartmentRepository repository;
	
	@GetMapping("/department")
	public List<Department> getDepartment(){
		 return repository.findAll();
		
	}
	
	@PostMapping("/department")
	public void addDepartment(@RequestBody Department department){
		repository.save(department);
	}
	
	@DeleteMapping("/department")
	public void deleteDepartment(@RequestBody int deptId) {
		repository.deleteById(deptId);
	}
	
	public static Department readDept(String departmentCode) {
		
		Configuration con = new Configuration().configure().addAnnotatedClass(Department.class);
	    SessionFactory sf = con.buildSessionFactory();
        Session session = sf.openSession();
        Transaction transaction = session.beginTransaction();
        Query q = session.createQuery("SELECT d FROM Department d where d.departmentCode = :departmentCode");
        q.setParameter("departmentCode", departmentCode);
        List<Department> companyList=q.getResultList();
        transaction.commit();
        session.close();
		return companyList.get(0);
		
	}

}
