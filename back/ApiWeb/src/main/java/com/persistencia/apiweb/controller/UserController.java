package com.persistencia.apiweb.controller;

import com.persistencia.apiweb.config.AppSettings;
import com.persistencia.apiweb.dto.LoginDto;
import com.persistencia.apiweb.dto.UserDTO;
import com.persistencia.apiweb.jpa.entity.User;
import com.persistencia.apiweb.service.LoginMesage;
import com.persistencia.apiweb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = AppSettings.URL_CROSS_ORIGIN)
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
        User user = userService.createUserCompany(userDTO);
        user.setPasswordUser("");
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        LoginMesage response = userService.AuthUser(loginDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findUserById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }
}
