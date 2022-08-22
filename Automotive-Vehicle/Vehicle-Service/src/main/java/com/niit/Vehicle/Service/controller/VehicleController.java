package com.niit.Vehicle.Service.controller;

import com.niit.Vehicle.Service.domain.Vehicle;
import com.niit.Vehicle.Service.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2")
public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    @GetMapping("/all")
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        List<Vehicle> vehicles = vehicleService.findAllVehicles();
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
        return new ResponseEntity<>(vehicleService.addVehicle(vehicle),HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Vehicle> updateVehicle(@RequestBody Vehicle vehicle) {
        return new ResponseEntity<>(vehicleService.updateVehicle(vehicle),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{modelName}")
    public ResponseEntity<?> deleteVehicle(@PathVariable String modelName) {
        vehicleService.deleteVehicle(modelName);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
