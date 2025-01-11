package com.persistencia.apiweb.jpa.repository;

import com.persistencia.apiweb.jpa.entity.HistoryUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface HistoryUserRepository extends JpaRepository<HistoryUser, Long> {
    @Query("SELECT h FROM HistoryUser h LEFT JOIN FETCH h.ticketHistory WHERE h.id = :idHistoria")
    Optional<HistoryUser> findHistoryWithTickets(@Param("idHistoria") long idHistoria);
}
