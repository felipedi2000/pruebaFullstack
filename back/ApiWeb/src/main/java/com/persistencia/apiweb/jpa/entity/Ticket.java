package com.persistencia.apiweb.jpa.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ticket")
    private long id;

    @Column(name = "titulo", nullable = false)
    private String ticketTitle;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String ticketDescription;

    @Column(name = "estado", nullable = false)
    private int ticketStatus;

    @Column(name = "comentario")
    private String ticketComentary;

    @Column(name = "id_historia", insertable = false, updatable = false)
    private long idHistory;

    @Column(name = "creado_por", insertable = false, updatable = false)
    private long createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_historia", nullable = false)
    @JsonBackReference
    private HistoryUser historyTicket;

    @ManyToOne
    @JoinColumn(name = "creado_por")
    private User userCreator;

    public Ticket() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTicketTitle() {
        return ticketTitle;
    }

    public void setTicketTitle(String ticketTitle) {
        this.ticketTitle = ticketTitle;
    }

    public String getTicketDescription() {
        return ticketDescription;
    }

    public void setTicketDescription(String ticketDescription) {
        this.ticketDescription = ticketDescription;
    }

    public int getTicketStatus() {
        return ticketStatus;
    }

    public void setTicketStatus(int ticketStatus) {
        this.ticketStatus = ticketStatus;
    }

    public String getTicketComentary() {
        return ticketComentary;
    }

    public void setTicketComentary(String ticketComentary) {
        this.ticketComentary = ticketComentary;
    }

    public long getIdHistory() {
        return idHistory;
    }

    public void setIdHistory(long idHistory) {
        this.idHistory = idHistory;
    }

    public HistoryUser getHistoryTicket() {
        return historyTicket;
    }

    public void setHistoryTicket(HistoryUser historyTicket) {
        this.historyTicket = historyTicket;
    }

    public long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public User getUserCreator() {
        return userCreator;
    }

    public void setUserCreator(User userCreator) {
        this.userCreator = userCreator;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + id +
                ", ticketTitle='" + ticketTitle + '\'' +
                ", ticketDescription='" + ticketDescription + '\'' +
                ", ticketStatus='" + ticketStatus + '\'' +
                ", ticketComentary='" + ticketComentary + '\'' +
                ", idHistory=" + idHistory +
                '}';
    }
}
