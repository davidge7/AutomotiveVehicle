package com.niit.Vehicle.Service.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class User {

    @Id
    private String emailId;
    private String userName;
    private String password;
    private UserRole userRole;
    private String image;
    private List<TempVehicle>  cart;
}
