package com.persistencia.apiweb.controller;

import com.persistencia.apiweb.config.AppSettings;
import com.persistencia.apiweb.dto.TicketUpDto;
import com.persistencia.apiweb.dto.TicketNewDto;
import com.persistencia.apiweb.jpa.entity.Ticket;
import com.persistencia.apiweb.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/ticket")
@CrossOrigin(origins = AppSettings.URL_CROSS_ORIGIN)
public class TicketController {

    @Autowired
    TicketService ticketService;

    @PutMapping("/update")
    public ResponseEntity<String> updateTicket(@RequestBody TicketUpDto ticketDto) {
        String response = ticketService.updateTicket(ticketDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/save")
    public ResponseEntity<String>  createUser(@RequestBody TicketNewDto ticketDto) {
        String response = ticketService.createTicket(ticketDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.findAllTickets();
        if (tickets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }
}
