package com.persistencia.apiweb.jpa.repository;

import com.persistencia.apiweb.jpa.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
