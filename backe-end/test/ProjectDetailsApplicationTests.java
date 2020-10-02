package com.example.demo;

import java.sql.Date;
import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.controller.DepartmentController;
import com.example.demo.controller.EmployeeController;
import com.example.demo.model.Department;
import com.example.demo.model.Employee;

@SpringBootTest
class ProjectDetailsApplicationTests {

	@Test
	void contextLoads() {
	}
	
	@Test
	void departmentTest() {
		String departmentCode="s1";
//		Department dep = DepartmentController.readDept(departmentCode);
//		System.out.println("+++++++++++++++++++++++++++++++");
//		System.out.println(dep.toString());
		
		Configuration con = new Configuration().configure().addAnnotatedClass(Department.class);
	    SessionFactory sf = con.buildSessionFactory();
        Session session = sf.openSession();
        Transaction transaction = session.beginTransaction();
        Query q = session.createQuery("SELECT d FROM Department d where d.departmentCode = :departmentCode");
        q.setParameter("departmentCode", departmentCode);
        List<Department> companyList=q.getResultList();
        transaction.commit();
        session.close();
        System.out.println(companyList.get(0).toString());
	}
	
	@Test
	void basedOnCompanyTest() {
		//EmployeeController.readDept();
		String company="s1";
		Configuration con = new Configuration().configure().addAnnotatedClass(Employee.class);
	    SessionFactory sf = con.buildSessionFactory();
        Session session = sf.openSession();
        Transaction transaction = session.beginTransaction();
        Query q = session.createQuery("SELECT  department,count(*) as no_of_employees FROM Employee e where e.company = :company group by department");
        q.setParameter("company", company);
        List companyList=q.getResultList();
        transaction.commit();
        session.close();
	}
	
	@Test
	void dojTest() {
		//EmployeeController.readDept();
		String company="s1";
		Date startDate  = new Date(2019-10-01);
		Date endDate  = new Date(2020-10-01);
		Configuration con = new Configuration().configure().addAnnotatedClass(Employee.class);
	    SessionFactory sf = con.buildSessionFactory();
        Session session = sf.openSession();
        Transaction transaction = session.beginTransaction();
        Query q = session.createQuery("SELECT e FROM Employee e where e.doj> :startDate AND e.doj<:endDate AND e.company = :company");
        q.setParameter("startDate", startDate);
        q.setParameter("endDate", endDate);
        q.setParameter("company", company);
        List companyList=q.getResultList();
        transaction.commit();
        session.close();
	}

}
