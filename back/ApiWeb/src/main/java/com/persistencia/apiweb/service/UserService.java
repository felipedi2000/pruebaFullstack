package com.persistencia.apiweb.service;

import com.persistencia.apiweb.dto.LoginDto;
import com.persistencia.apiweb.dto.UserDTO;
import com.persistencia.apiweb.jpa.entity.Company;
import com.persistencia.apiweb.jpa.entity.User;
import com.persistencia.apiweb.jpa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  CompanyService companyService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginMesage AuthUser(LoginDto loginDto) {

        Optional<User> user = userRepository.findByEmailUser(loginDto.getEmail());

        if (user.isPresent()) {
            User foundUser = user.get();
            String password = loginDto.getPassword();
            String encodePassword = foundUser.getPasswordUser();
            if (passwordEncoder.matches(password, encodePassword)) {
                return new LoginMesage( true, foundUser.getId(), foundUser.getNameUser());
            } else {
                return new LoginMesage( false, -1,"");
            }
        } else {
            return new LoginMesage(false, -1,"");
        }

    }

    public User createUserCompany(UserDTO userDTO) {
        Optional<User> user = userRepository.findByEmailUser(userDTO.getEmail());
        User userNew = new User();
        if (user.isPresent()){
            userNew.setNameUser("usuario ya existente");
            return userNew;
        } else {
            userNew.setNameUser(userDTO.getUserName());
            userNew.setEmailUser(userDTO.getEmail());
            String encodedPassword = passwordEncoder.encode(userDTO.getPasswordHash());
            userNew.setPasswordUser(encodedPassword);
            Company company = companyService.findCompanyById(userDTO.getIdCompany());
            userNew.setCompanyUser(company);
            return userRepository.save(userNew);
        }
    }

    public User findUserById (long id){
        return userRepository.findById(id).orElse(null);
    }
}
