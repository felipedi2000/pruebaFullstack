package com.persistencia.apiweb.service;

import com.persistencia.apiweb.dto.HistoryUserDto;
import com.persistencia.apiweb.dto.HistoryUserTicketDTO;
import com.persistencia.apiweb.jpa.entity.*;
import com.persistencia.apiweb.jpa.repository.HistoryUserRepository;
import com.persistencia.apiweb.jpa.repository.TicketRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistoryUserService {

    @Autowired
    private HistoryUserRepository historyUserRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private TicketRepository ticketRepository;

    public void updateHistoryUser(HistoryUserDto historyUserDto){

        HistoryUser historyUser = getHistoryUserById(historyUserDto.getId());

        historyUser.setTitleHistory(historyUserDto.getTitleHistory());
        historyUser.setDescriptionHistory(historyUserDto.getDescriptionHistory());

        historyUserRepository.save(historyUser);
    }

    public HistoryUser getHistoryUserById(Long id){
        return historyUserRepository.findById(id).orElse(null);
    }

    public List<HistoryUser> findAllHistoryUser(){
        return historyUserRepository.findAll();
    }

    @Transactional
    public String saveHistoryUserTicket(HistoryUserTicketDTO historyUserDTO) {

        HistoryUser historyUser = new HistoryUser();

        historyUser.setTitleHistory(historyUserDTO.getTitleHistory());
        historyUser.setDescriptionHistory(historyUserDTO.getDescriptionHistory());

        Project project = projectService.getProjectById(historyUserDTO.getIdProject());

        User user = userService.findUserById(historyUserDTO.getHistoryCreatedBy());

        historyUser.setProjectHistory(project);
        historyUser.setUserCreator(user);

        historyUserRepository.save(historyUser);

        Ticket ticket = new Ticket();

        ticket.setTicketTitle(historyUserDTO.getTitleTicket());
        ticket.setTicketDescription(historyUserDTO.getDescriptionTicket());
        ticket.setTicketComentary(historyUserDTO.getTicketComent());
        ticket.setTicketStatus(1);
        ticket.setHistoryTicket(historyUser);
        ticket.setUserCreator(user);

        ticketRepository.save(ticket);



        return "ticket add";

    }

    public Optional<HistoryUser> findHistoryWithTickets(long id) {
        return historyUserRepository.findHistoryWithTickets(id);
    }
}
