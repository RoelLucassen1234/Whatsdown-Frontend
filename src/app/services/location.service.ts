import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  public getIPAddress()
  {
    return this.http.get('/test');  
      
  }
  
  getIpCliente() {
    return this.http.get('http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK') // ...using post request '
    
}

getLocation(ip : string){
  let params = new HttpParams().set("ip",ip);
  return this.http.get<any>(`${environment.apiUrl}/api/location/ip`, {params : params})
}

}
