package com.niit.Vehicle.Service.repository;

import com.niit.Vehicle.Service.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


public interface UserRepository extends MongoRepository<User,String> {
}
