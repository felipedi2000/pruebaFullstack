package com.persistencia.apiweb.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "proyectos")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proyecto")
    private long id;

    @Column(name = "nombre_proyecto", nullable = false, length = 255)
    private String nameProject;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descriptionProject;

    @Column(name = "id_empresa", insertable = false, updatable = false)
    private long idCompany;

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    private Company companyProject;

    @JsonIgnore
    @OneToMany(mappedBy = "projectHistory")
    private List<HistoryUser> historyUserList;

    public Project() {
    }

    public Company getCompanyProject() {
        return companyProject;
    }

    public void setCompanyProject(Company companyProject) {
        this.companyProject = companyProject;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNameProject() {
        return nameProject;
    }

    public void setNameProject(String nameProject) {
        this.nameProject = nameProject;
    }

    public String getDescriptionProject() {
        return descriptionProject;
    }

    public void setDescriptionProject(String descriptionProject) {
        this.descriptionProject = descriptionProject;
    }

    public long getIdCompany() {
        return idCompany;
    }

    public void setIdCompany(long idCompany) {
        this.idCompany = idCompany;
    }

    public List<HistoryUser> getHistoryUserList() {
        return historyUserList;
    }

    public void setHistoryUserList(List<HistoryUser> historyUserList) {
        this.historyUserList = historyUserList;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", nameProject='" + nameProject + '\'' +
                ", descriptionProject='" + descriptionProject + '\'' +
                ", idCompany=" + idCompany +
                '}';
    }
}
