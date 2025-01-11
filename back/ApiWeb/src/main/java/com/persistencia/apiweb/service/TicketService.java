package com.persistencia.apiweb.service;

import com.persistencia.apiweb.dto.TicketUpDto;
import com.persistencia.apiweb.dto.TicketDto;
import com.persistencia.apiweb.dto.TicketNewDto;
import com.persistencia.apiweb.jpa.entity.HistoryUser;
import com.persistencia.apiweb.jpa.entity.Ticket;
import com.persistencia.apiweb.jpa.entity.User;
import com.persistencia.apiweb.jpa.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CompanyService companyService;
    @Autowired
    private HistoryUserService historyUserService;

    public Ticket saveTicket(TicketDto ticketDto) {
        Ticket ticket = new Ticket();
        ticket.setTicketTitle(ticketDto.getTitle());
        ticket.setTicketDescription(ticketDto.getDescription());
        ticket.setTicketStatus(1);
        return ticketRepository.save(ticket);
    }

    public Ticket findTicketById(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public String updateTicket(TicketUpDto ticketDto) {
        String response = "";
        Ticket ticket = findTicketById(ticketDto.getId());
        if(ticket != null) {
            ticket.setTicketTitle(ticketDto.getTitle());
            ticket.setTicketDescription(ticketDto.getDescription());
            ticket.setTicketStatus(ticketDto.getStatus());
            ticket.setTicketComentary(ticketDto.getComent());
            ticketRepository.save(ticket);
            response = "Ticket updated";
        } else {
            response = "Ticket not updated";
        }
        return response;
    }

    public List<Ticket> findAllTickets() {
        return ticketRepository.findAll();
    }

    public String createTicket(TicketNewDto ticketDto) {
        String response = "";
        Optional<Ticket> ticket = ticketRepository.findByTicketTitle(ticketDto.getTitle());
        Ticket ticketNew = new Ticket();
        if (ticket.isPresent()){
            response="ticket existente";
        } else {
            ticketNew.setTicketTitle(ticketDto.getTitle());
            ticketNew.setTicketDescription(ticketDto.getDescription());
            ticketNew.setTicketStatus(ticketDto.getStatus());
            ticketNew.setTicketComentary(ticketDto.getComent());
            User user = userService.findUserById(ticketDto.getCreatedBy());

            HistoryUser historyUser = historyUserService.getHistoryUserById(ticketDto.getHistoryUser());

            ticketNew.setUserCreator(user);
            ticketNew.setHistoryTicket(historyUser);

            ticketRepository.save(ticketNew);
            response="ticket creado";
        }
        return response;
    }
}
