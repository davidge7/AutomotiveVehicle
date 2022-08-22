package com.niit.Vehicle.Service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND,reason = "Vehicle Not Found In This Database")
public class VehicleNotFoundException extends Exception{
}
