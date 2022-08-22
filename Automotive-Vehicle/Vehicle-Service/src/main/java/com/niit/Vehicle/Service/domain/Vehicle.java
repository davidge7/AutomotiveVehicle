package com.niit.Vehicle.Service.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {

    @Id
    private String modelName;
    private String company, description, imageUrl;
    private double price;


}
