package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@Tag(name = "Employee Management", description = "APIs for managing employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Operation(summary = "View Home Page", description = "Displays the list of employees")
    @GetMapping("/")
    public String viewHomePage(Model model) {
        model.addAttribute("listEmployees", employeeService.getAllEmployees());
        return "index";
    }

    @Operation(summary = "Show New Employee Form", description = "Displays the form to add a new employee")
    @GetMapping("/showNewEmployeeForm")
    public String showNewEmployeeForm(Model model) {
        Employee employee = new Employee();
        model.addAttribute("employee", employee);
        return "add-employee";
    }

    @Operation(summary = "Save Employee", description = "Saves a new employee or updates an existing one")
    @PostMapping("/saveEmployee")
    public String saveEmployee(@ModelAttribute("employee") Employee employee) {
        employeeService.saveEmployee(employee);
        return "redirect:/";
    }

    @Operation(summary = "Show Update Form", description = "Displays the form to update an employee")
    @GetMapping("/showFormForUpdate/{id}")
    public String showFormForUpdate(@PathVariable(value = "id") String id, Model model) {
        Employee employee = employeeService.getEmployeeById(id).get();
        model.addAttribute("employee", employee);
        return "edit-employee";
    }

    @Operation(summary = "Delete Employee", description = "Deletes an employee by ID")
    @GetMapping("/deleteEmployee/{id}")
    public String deleteEmployee(@PathVariable(value = "id") String id) {
        this.employeeService.deleteEmployee(id);
        return "redirect:/";
    }
}