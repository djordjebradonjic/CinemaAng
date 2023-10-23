import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectionResponse } from '../model/projectionResponse';
import { Observable } from 'rxjs';
import { ReservationRequest } from '../model/reservationRequest';
import { ReservationResponse } from '../model/reservationResponse';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }


  public create(reservationRequest:ReservationRequest):Observable<ReservationResponse>{

    return this.http.post<ReservationResponse>("http://localhost:8080/api/reservations",reservationRequest);
  }



}
