package com.example.employeemanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontEndController {
    @GetMapping("/")
    public String showEmployees() {
        return "employees"; // serves employees.html
    }
}
