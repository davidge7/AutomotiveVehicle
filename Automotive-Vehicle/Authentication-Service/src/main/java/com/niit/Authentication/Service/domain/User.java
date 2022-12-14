package com.niit.Authentication.Service.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class User {

    @Id
    private String emailId;
    private String userName;
    private String password;
    private UserRole userRole;

}
