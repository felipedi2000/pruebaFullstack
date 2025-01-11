package com.persistencia.apiweb.service;

import com.persistencia.apiweb.jpa.entity.Company;
import com.persistencia.apiweb.jpa.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public Company findCompanyById(long id){
        return companyRepository.findById(id).orElse(null);
    }

    public List<Company> findAllCompanies(){
        return companyRepository.findAll();
    }
}
