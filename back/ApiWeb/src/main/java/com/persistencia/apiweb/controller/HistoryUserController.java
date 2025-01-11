package com.persistencia.apiweb.controller;

import com.persistencia.apiweb.config.AppSettings;
import com.persistencia.apiweb.dto.HistoryUserDto;
import com.persistencia.apiweb.dto.HistoryUserTicketDTO;
import com.persistencia.apiweb.dto.UserDTO;
import com.persistencia.apiweb.jpa.entity.HistoryUser;
import com.persistencia.apiweb.jpa.entity.User;
import com.persistencia.apiweb.service.HistoryUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/histories")
@CrossOrigin(origins = AppSettings.URL_CROSS_ORIGIN)
public class HistoryUserController {

    @Autowired
    HistoryUserService historyUserService;

    @PutMapping("/update")
    public ResponseEntity<String> updateTicket(@RequestBody HistoryUserDto historyUserDto) {
        historyUserService.updateHistoryUser(historyUserDto);
        return ResponseEntity.ok("Histoy updated");
    }

    @PostMapping("/saveHistTick")
    public ResponseEntity<String> saveHistoryUserTicket(@RequestBody HistoryUserTicketDTO historyUserDTO) {
        try {
            String response = historyUserService.saveHistoryUserTicket(historyUserDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.ok("History not add");
        }
    }

    @GetMapping
    public ResponseEntity<List<HistoryUser>> getAllHistoryUser() {
        List<HistoryUser> historyUserList = historyUserService.findAllHistoryUser();
        if (historyUserList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(historyUserList, HttpStatus.OK);
    }

    @GetMapping("/{id}/tickets")
    public ResponseEntity<HistoryUser> getHistoryWithTickets(@PathVariable long id) {
        Optional<HistoryUser> history = historyUserService.findHistoryWithTickets(id);
        return history.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
