package com.persistencia.apiweb.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "empresas")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empresa")
    private long id;

    @Column(name = "nombre_empresa", nullable = false, length = 255)
    private String nameCompany;

    @Column(name = "nit", nullable = false, length = 20, unique = true)
    private String nitCompany;

    @Column(name = "telefono", length = 20)
    private String phoneCompany;

    @Column(name = "direccion", columnDefinition = "TEXT")
    private String adressCompany;

    @Column(name = "correo", length = 255)
    private String mailCompany;

    @JsonIgnore
    @OneToMany(mappedBy = "companyUser")
    private List<User> usersCompany;

    @JsonIgnore
    @OneToMany(mappedBy = "companyProject")
    private List<Project> projectsCompany;


    public Company() {
    }

    public List<Project> getProjectsCompany() {
        return projectsCompany;
    }

    public void setProjectsCompany(List<Project> projectsCompany) {
        this.projectsCompany = projectsCompany;
    }

    public List<User> getUsersCompany() {
        return usersCompany;
    }

    public void setUsersCompany(List<User> usersCompany) {
        this.usersCompany = usersCompany;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNameCompany() {
        return nameCompany;
    }

    public void setNameCompany(String nameCompany) {
        this.nameCompany = nameCompany;
    }

    public String getNitCompany() {
        return nitCompany;
    }

    public void setNitCompany(String nitCompany) {
        this.nitCompany = nitCompany;
    }

    public String getPhoneCompany() {
        return phoneCompany;
    }

    public void setPhoneCompany(String phoneCompany) {
        this.phoneCompany = phoneCompany;
    }

    public String getAdressCompany() {
        return adressCompany;
    }

    public void setAdressCompany(String adressCompany) {
        this.adressCompany = adressCompany;
    }

    public String getMailCompany() {
        return mailCompany;
    }

    public void setMailCompany(String mailCompany) {
        this.mailCompany = mailCompany;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", nameCompany='" + nameCompany + '\'' +
                ", nitCompany='" + nitCompany + '\'' +
                ", phoneCompany='" + phoneCompany + '\'' +
                ", adressCompany='" + adressCompany + '\'' +
                ", mailCompany='" + mailCompany + '\'' +
                '}';
    }
}
