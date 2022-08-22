package com.niit.Vehicle.Service.controller;

import com.niit.Vehicle.Service.domain.TempVehicle;
import com.niit.Vehicle.Service.domain.User;
import com.niit.Vehicle.Service.domain.Vehicle;
import com.niit.Vehicle.Service.exception.UserAlreadyExistsException;
import com.niit.Vehicle.Service.exception.UserNotFoundException;
import com.niit.Vehicle.Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v2/")
//@CrossOrigin(origins="http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;




    @GetMapping("/getallusers")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);
    }

    @PostMapping("/updateuserprofile")
    public ResponseEntity<?> updateUserProfile(@RequestParam("emailid")  String emailid, @RequestParam("username")  String username, @RequestParam("file") MultipartFile file) throws IOException {
        try {
            return new ResponseEntity<>(userService.updateUserProfile(emailid,username,file), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("file IOException thrown", HttpStatus.OK);
        }
    }


    @PutMapping("/addtocart/{emailId}")
    public ResponseEntity<?> addToCart(@PathVariable String emailId, @RequestBody TempVehicle tempVehicle) {
        return new ResponseEntity<>(userService.addToCart(emailId,tempVehicle), HttpStatus.OK);
    }

    @PutMapping("/deletefromcart/{emailId}/{modelName}")
    public ResponseEntity<?> deleteFromCart(@PathVariable String emailId, @PathVariable String modelName) {
        return new ResponseEntity<>(userService.deleteFromCart(emailId,modelName), HttpStatus.OK);
    }

    @GetMapping("/getfromcart/{emailId}")
    public ResponseEntity<?> getFromCart(@PathVariable String emailId) {
        return new ResponseEntity<>(userService.getFromCart(emailId), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistsException {
        return new ResponseEntity<>(userService.register(user), HttpStatus.OK);
    }
}
