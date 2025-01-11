package com.persistencia.apiweb.controller;

import com.persistencia.apiweb.config.AppSettings;
import com.persistencia.apiweb.jpa.entity.Company;
import com.persistencia.apiweb.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/comp")
@CrossOrigin(origins = AppSettings.URL_CROSS_ORIGIN)
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.findAllCompanies();
        if (companies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }
}
