import { Injectable } from '@angular/core';
import { MovieDTO } from '../model/movieDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieResponse } from '../model/movieResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  public createMovie(movieDto: MovieDTO): Observable<MovieResponse> {
    return this.http.post<MovieResponse>("http://localhost:8080/api/movies", movieDto);
  }



  public getAll(): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>("http://localhost:8080/api/movies");
  }

  public deleteById(id: number): Observable<any> {
     return this.http.delete("http://localhost:8080/api/movies/" + id);
    
    }

}
