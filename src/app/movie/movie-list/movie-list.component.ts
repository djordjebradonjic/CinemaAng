import { Component } from '@angular/core';
import {  MovieResponse } from 'src/app/model/movieResponse';
import { JwtServiceService } from 'src/app/services/jwt-service.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movieResponse!: MovieResponse[];


  constructor(private movieService: MovieService,
          ) {

  }
  ngOnInit(): void {
    this.movieService.getAll().subscribe({

      next: (res: MovieResponse[]) => { this.movieResponse = res; },
      error: (err: any) => { console.log(err); }
    })
  }
}
