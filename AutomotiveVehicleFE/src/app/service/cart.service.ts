import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartBaseUrl : string = "http://localhost:9000/api/v2";
  private cartItemList: any;

  constructor(private httpClient: HttpClient) { }

  
  public addToCart(vehicle: Vehicle) {
    let req_Email = window.localStorage.getItem('tgt_email');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.put<any>(this.cartBaseUrl+"/addtocart/"+ req_Email, vehicle, {'headers':reqHeader});
  }


  public deleteFromCart( modelName: string) { 
    let req_Email = window.localStorage.getItem('tgt_email');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('tgt'));    // request body is mandatory for PUT.
    return this.httpClient.put<any>(`${this.cartBaseUrl}/deletefromcart/${req_Email}/${modelName}`,{},{'headers':reqHeader});
  }

  public getFromCart() {
    let req_Email = window.localStorage.getItem('tgt_email');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.get<any>(`${this.cartBaseUrl}/getfromcart/${req_Email}`,{'headers': reqHeader});
  }

  
}
