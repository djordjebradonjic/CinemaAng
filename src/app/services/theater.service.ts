import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TheaterDTO } from '../model/theaterDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private http: HttpClient) { }

 
  
  
  
  public getAll():Observable<TheaterDTO[]>{
    return this.http.get<TheaterDTO[]>("http://localhost:8080/api/theaters");
  }
  
}
