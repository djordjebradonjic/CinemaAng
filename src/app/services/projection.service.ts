import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectionDTO } from '../model/projectionDTO';
import { Observable } from 'rxjs';
import { ProjectionResponse } from '../model/projectionResponse';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  constructor(private http: HttpClient) { }



  public createProjection(projectionDTO:ProjectionDTO):Observable<ProjectionResponse>{

    return this.http.post<ProjectionResponse>("http://localhost:8080/api/projections",projectionDTO);

  }
  public  findAllAvailable():Observable<ProjectionResponse[]>{

    return this.http.get<ProjectionResponse[]>("http://localhost:8080/api/projections/available");
 }
}
