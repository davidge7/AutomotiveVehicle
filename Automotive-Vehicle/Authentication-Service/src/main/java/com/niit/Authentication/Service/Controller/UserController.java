package com.niit.Authentication.Service.Controller;

import com.niit.Authentication.Service.domain.User;
import com.niit.Authentication.Service.exception.InvalidCredentialsException;
import com.niit.Authentication.Service.exception.UserAlreadyExistsException;
import com.niit.Authentication.Service.exception.UserNotFoundException;
import com.niit.Authentication.Service.security.SecurityTokenGenerator;
import com.niit.Authentication.Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
//@CrossOrigin(origins="http://localhost:4200")
public class UserController {


    private UserService userService;

    private SecurityTokenGenerator securityTokenGenerator;


    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator) {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            User user1 = userService.signUp(user);
            return new ResponseEntity<>(user1, HttpStatus.OK);
        }
        catch (Exception e){
            e.getMessage();
            e.fillInStackTrace();
            throw new UserAlreadyExistsException();
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody User user) throws UserNotFoundException {
        User resUser = userService.logIn(user);
        if(resUser==null){
            return new ResponseEntity("Login failed",HttpStatus.NOT_FOUND);
        }
        resUser.setPassword(null);
        return new ResponseEntity<>(securityTokenGenerator.generateToken(resUser), HttpStatus.OK);
    }
}
