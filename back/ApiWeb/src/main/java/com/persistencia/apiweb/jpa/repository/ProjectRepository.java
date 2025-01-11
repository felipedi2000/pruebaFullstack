package com.persistencia.apiweb.jpa.repository;

import com.persistencia.apiweb.jpa.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
