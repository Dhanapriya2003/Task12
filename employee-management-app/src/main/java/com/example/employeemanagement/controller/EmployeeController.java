package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employees")
@Tag(name = "Employee API", description = "Employee Management Operations")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;

    @Operation(summary = "Get all employees")
    @GetMapping
    public List<Employee> getAllEmployees() {
        System.out.println("inside getAllEmployees");
        return repository.findAll();
    }
    @Operation(summary = "Get employee by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        System.out.println("Fetching employee with ID: " + id);

        Optional<Employee> employee = repository.findById(id);
        if (employee.isPresent()) {
            System.out.println("Employee found: " + employee.get());
            return ResponseEntity.ok(employee.get());
        } else {
            System.out.println("Employee not found for ID: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @Operation(summary = "Create new employee")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Employee createEmployee(@RequestBody Employee employee) {
        System.out.println("inside createEmployee");
        return repository.save(employee);
    }

    @Operation(summary = "Update employee")
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String id, @RequestBody Employee employeeDetails) {
        System.out.println("inside updateEmployee with ID: " + id);

        Optional<Employee> optionalEmployee = repository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();
            existingEmployee.setFirstName(employeeDetails.getFirstName());
            existingEmployee.setLastName(employeeDetails.getLastName());
            existingEmployee.setEmail(employeeDetails.getEmail());

            Employee updatedEmployee = repository.save(existingEmployee);
            System.out.println("Employee updated successfully");
            return ResponseEntity.ok(updatedEmployee);
        } else {
            System.out.println("Employee not found for ID: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Operation(summary = "Delete employee")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteEmployee(@PathVariable String id) {
        System.out.println("inside deleteEmployee with ID: " + id);

        if (repository.existsById(id)) {
            repository.deleteById(id);
            System.out.println("Employee deleted successfully");
            return ResponseEntity.noContent().build();
        } else {
            System.out.println("Employee not found for ID: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
