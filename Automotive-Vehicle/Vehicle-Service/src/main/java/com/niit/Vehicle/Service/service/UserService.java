package com.niit.Vehicle.Service.service;

import com.niit.Vehicle.Service.domain.TempVehicle;
import com.niit.Vehicle.Service.domain.User;
import com.niit.Vehicle.Service.exception.UserAlreadyExistsException;
import com.niit.Vehicle.Service.proxy.UserProxy;
import com.niit.Vehicle.Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;
    private UserProxy userProxy;

    @Autowired
    public UserService(UserRepository userRepository, UserProxy userProxy) {
        this.userRepository = userRepository;
        this.userProxy = userProxy;
    }

    public User register(User user) throws UserAlreadyExistsException {
        if (userRepository.findById(user.getEmailId()).isPresent())
        {
            throw new UserAlreadyExistsException();
        }
        userProxy.signUp(user);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {                       // for admin access only
        return userRepository.findAll();
    }

    public User updateUserProfile(String emailId, String userName, MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename() ;
        User user = userRepository.findById(emailId).get();
        if(fileName.contains("..")) {
            System.out.println("Not a valid file");
        }
        user.setUserName(userName);
        user.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
        return userRepository.save(user);
    }


    // custom method in repository can be made for below methods
    //no such exception, if not user is present.


    public User addToCart(String emailId, TempVehicle tempVehicle) {
        User user = userRepository.findById(emailId).get();
        if(user.getCart() == null)
        {
            user.setCart(Arrays.asList(tempVehicle));
        }
        else{
            user.getCart().add(tempVehicle);
        }
        return userRepository.save(user);
    }


    public User deleteFromCart(String emailId, String modelName) {
        User user = userRepository.findById(emailId).get();
        user.getCart().removeIf(tv -> tv.getModelName().equals(modelName));
        // set his cart again, if vehicle not deleted,
        return userRepository.save(user);
    }


    public List<TempVehicle> getFromCart(String emailId) {
        return userRepository.findById(emailId).get().getCart();
    }
}
