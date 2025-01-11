package com.persistencia.apiweb.jpa.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "historias_usuario")
public class HistoryUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historia")
    private long id;

    @Column(name = "titulo", nullable = false, length = 255)
    private String titleHistory;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descriptionHistory;

    @Column(name = "id_proyecto", insertable = false, updatable = false)
    private long idProject;

    @Column(name = "creado_por", insertable = false, updatable = false)
    private long createdBy;

    @ManyToOne
    @JoinColumn(name = "id_proyecto")
    private Project projectHistory;

    @OneToMany(mappedBy = "historyTicket", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Ticket> ticketHistory;

    @ManyToOne
    @JoinColumn(name = "creado_por")
    private User userCreator;

    public HistoryUser() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitleHistory() {
        return titleHistory;
    }

    public void setTitleHistory(String titleHistory) {
        this.titleHistory = titleHistory;
    }

    public String getDescriptionHistory() {
        return descriptionHistory;
    }

    public void setDescriptionHistory(String descriptionHistory) {
        this.descriptionHistory = descriptionHistory;
    }

    public long getIdProject() {
        return idProject;
    }

    public void setIdProject(long idProject) {
        this.idProject = idProject;
    }

    public long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public Project getProjectHistory() {
        return projectHistory;
    }

    public void setProjectHistory(Project projectHistory) {
        this.projectHistory = projectHistory;
    }

    public List<Ticket> getTicketHistory() {
        return ticketHistory;
    }

    public void setTicketHistory(List<Ticket> ticketHistory) {
        this.ticketHistory = ticketHistory;
    }

    public User getUserCreator() {
        return userCreator;
    }

    public void setUserCreator(User userCreator) {
        this.userCreator = userCreator;
    }
}
