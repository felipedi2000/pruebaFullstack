package com.persistencia.apiweb.jpa.repository;

import com.persistencia.apiweb.jpa.entity.Ticket;
import com.persistencia.apiweb.jpa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByTicketTitle(String ticketTitle);
}
