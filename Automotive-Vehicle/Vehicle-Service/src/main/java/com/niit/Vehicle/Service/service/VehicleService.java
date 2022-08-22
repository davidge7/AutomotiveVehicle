package com.niit.Vehicle.Service.service;

import com.niit.Vehicle.Service.domain.Vehicle;
import com.niit.Vehicle.Service.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    VehicleRepository vehicleRepository;


    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }


    public List<Vehicle> findAllVehicles() {
        return vehicleRepository.findAll();
    }


    public Vehicle updateVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }


    public void deleteVehicle(String modelName) {
        vehicleRepository.deleteById(modelName);
    }
}
