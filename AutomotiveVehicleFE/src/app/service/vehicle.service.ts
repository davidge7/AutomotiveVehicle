import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleBaseUrl : string = "http://localhost:9000/api/v2";
  constructor(private httpClient: HttpClient) { }

  public getVehicles() {
    return this.httpClient.get<any>(this.vehicleBaseUrl + "/all");
  }

  public addVehicle(vehicle: Vehicle) {
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.post<any>(this.vehicleBaseUrl + "/add",vehicle, {'headers': reqHeader});
  }

  public updateVehicle(vehicle: Vehicle) {
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.put<any>(this.vehicleBaseUrl + "/update",vehicle, {'headers': reqHeader});
  }

  public deleteVehicle(modelName: string) {
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.delete<any>(this.vehicleBaseUrl + "/delete/" + modelName, {'headers': reqHeader});
  }
 
}
