import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  public vehiclesInCart: any = []
  public grandTotal: number = 0;


  constructor( private cartService: CartService) { }

  ngOnInit(): void {
    this.getFromCart();
  }

  
  public getFromCart(){
    this.cartService.getFromCart().subscribe(
      response => {
              console.log("success message :")
              console.log(response);
              this.vehiclesInCart = response;
              this.vehiclesInCart.forEach((v: any) => {
                this.grandTotal = v.price + this.grandTotal;
              });
            },
            error => {
              console.log("error message :")
              console.log(error);
            }
    );
  }

  public deleteFromCart(modelName: string){
    this.cartService.deleteFromCart(modelName).subscribe(
      response => {
              console.log("success message :")
              console.log(response);
              this.grandTotal = 0;
              this.getFromCart();
            },
            error => {
              console.log("error message :")
              console.log(error);
            }
    );
  }

}
