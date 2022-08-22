package com.niit.Vehicle.Service.repository;

import com.niit.Vehicle.Service.domain.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VehicleRepository extends MongoRepository<Vehicle, String> {
}
