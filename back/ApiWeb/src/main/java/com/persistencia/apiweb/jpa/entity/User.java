package com.persistencia.apiweb.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.Columns;

import java.util.List;

@Entity
@Table(name = "usuarios")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private long id;

    @Column(name = "nombre_usuario", nullable = false, length = 255)
    private String nameUser;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String emailUser;

    @JsonIgnore
    @Column(name = "password_hash", length = 255)
    private String passwordUser;

    @Column(name = "id_empresa",updatable=false,insertable=false)
    private long idCompany;

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    private Company companyUser;

    @JsonIgnore
    @OneToMany(mappedBy = "userCreator")
    private List<HistoryUser> historyUserCreated;

    @JsonIgnore
    @OneToMany(mappedBy = "userCreator")
    private List<Ticket> ticketsCreated;

    public User() {
    }

    public Company getCompanyUser() {
        return companyUser;
    }

    public void setCompanyUser(Company companyUser) {
        this.companyUser = companyUser;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }

    public String getEmailUser() {
        return emailUser;
    }

    public void setEmailUser(String emailUser) {
        this.emailUser = emailUser;
    }

    public String getPasswordUser() {
        return passwordUser;
    }

    public void setPasswordUser(String passwordUser) {
        this.passwordUser = passwordUser;
    }

    public long getIdCompany() {
        return idCompany;
    }

    public void setIdCompany(long idCompany) {
        this.idCompany = idCompany;
    }

    public List<HistoryUser> getHistoryUserCreated() {
        return historyUserCreated;
    }

    public void setHistoryUserCreated(List<HistoryUser> historyUserCreated) {
        this.historyUserCreated = historyUserCreated;
    }

    public List<Ticket> getTicketsCreated() {
        return ticketsCreated;
    }

    public void setTicketsCreated(List<Ticket> ticketsCreated) {
        this.ticketsCreated = ticketsCreated;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nameUser='" + nameUser + '\'' +
                ", emailUser='" + emailUser + '\'' +
                ", passwordUser='" + passwordUser + '\'' +
                ", idCompany=" + idCompany +
                '}';
    }
}
