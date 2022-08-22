import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehicle } from 'src/app/model/vehicle';
import { CartService } from 'src/app/service/cart.service';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  public role: string | undefined ;
  public vehicles: Vehicle[] = [];     
  public  editVehicle?: Vehicle | undefined; 
  public deleteVehicle?: Vehicle | undefined;
  model: any;


  
  constructor(private vehicleService: VehicleService, private cartService: CartService ,private user :UserService ,private route :Router) { }

  

  ngOnInit(): void {
    this.role = "ROLE_ADMIN" ;
    this.role = "ROLE_ADMIN" ;

        // window.localStorage.getItem("tgt_role");     
    this.getVehicles();
  }


  public getVehicles(){
    this.vehicleService.getVehicles().subscribe(
      response => {
        this.vehicles = response; 
        console.log(response);
      },
      error => {             
        console.log(error.message);
      } 
    );
  }

  public onAddVehicle(addForm: NgForm): void{
    this.vehicleService.addVehicle(addForm.value).subscribe(
        response => {
          console.log(response);
          this.getVehicles();
          addForm.reset();
        },
        error => {
          console.log(error.message);
          addForm.reset();
        }
      );
  }

  public onUpdateVehicle(vehicle: Vehicle): void{
    this.vehicleService.updateVehicle(vehicle).subscribe(
        response => {
          console.log(response);
          this.getVehicles();
        },
        error => {
          console.log(error.message);
        }
      );
  }


  public onDeleteVehicle(modelName:any): void{
    this.model=modelName;
    this.vehicleService.deleteVehicle(this.model).subscribe(
        response => {
          console.log(response);
          this.getVehicles();
        },
        error => {
          console.log(error.message);
        }
      );
  }

  public searchVehicles(key: string): void {
    const results: Vehicle[] = [];
    if(this.vehicles.length>=1) {
      for(const vehicle of this.vehicles){
        if(vehicle.modelName?.toLowerCase().indexOf(key.toLowerCase()) !== -1)    //        || vehicle.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
       // || vehicle.category.toLowerCase().indexOf(key.toLowerCase()) !== -1
        {
          results.push(vehicle);
        }
      }
    }
    this.vehicles = results;
      if(!key) {
          this.getVehicles();
      }
  }

  public onOpenModal(vehicle: any, mode: string) : void {   
    const container= document.getElementById('main-container');
    const button = document.createElement("button");
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');       //opens the modal
    if(mode === 'add') {
      button.setAttribute('data-target','#addVehicleModal');      //points to the id of the modal.
    }
    if(mode === 'edit') {
      this.editVehicle = vehicle ; 
      button.setAttribute('data-target','#updateVehicleModal');
    }
    if(mode === 'delete') {
      this.deleteVehicle = vehicle;
      button.setAttribute('data-target','#deleteVehicleModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public addToCart(vehicle : Vehicle) {
    if(this.user.isLoggedin==true)
    {
      this.cartService.addToCart(vehicle).subscribe(
        response => {
          console.log("success message :")
          console.log(response);
          window.alert("Added tO CART")
        },
        error => {
          console.log("error message :")
          console.log(error);
          window.alert("Vehicle Not Added to Cart Please Add AGAIN")

        }
      );
    }
    else{
      window.alert("You Are Currently Not Logged In.Please Log In To Use This Feature")
      this.route.navigate(["login"]);
    }
    
  }

}
