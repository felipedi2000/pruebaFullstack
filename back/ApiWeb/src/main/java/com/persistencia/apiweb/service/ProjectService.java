package com.persistencia.apiweb.service;

import com.persistencia.apiweb.jpa.entity.Project;
import com.persistencia.apiweb.jpa.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project getProjectById(long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
