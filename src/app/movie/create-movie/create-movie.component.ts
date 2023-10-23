import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieResponse } from '../../model/movieResponse';
import { MovieDTO } from '../../model/movieDto';
import { MovieService } from '../../services/movie.service';
import { ToastrService } from 'ngx-toastr';
import { RouteReuseStrategy, Router } from '@angular/router';



@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})

export class CreateMovieComponent implements OnInit {

  movieForm!: FormGroup;

  newMovie!: MovieDTO;
  movieResponse!: MovieResponse;


  genresSelect: string[] = ['COMEDY', 'DRAMA', 'ROMANCE', 'FANTASY', 'ACTION', 'HORROR', 'CRIME'];
  constructor(private fb: FormBuilder,
    private movieService: MovieService,
    private  toastrService: ToastrService,
    private router:Router) {

  }
  ngOnInit(): void {
    this.movieForm = this.fb.group({

      name: [''],
      director: [''],
      genres: [''],
      duration: [''],
      description: [''],
    })
  }


  onSubmit() {
    this.newMovie = Object.assign({}, this.movieForm.value);
    console.log('saving movie', this.newMovie);
    this.movieService.createMovie(this.newMovie).subscribe({


      next: (res: MovieResponse) => { this.movieResponse = res;
                                    this.movieResponse.deleted=false;
                                    this.toastrService.success("Created  new movie! id= "+ this.movieResponse.id); 
                                    this.router.navigate(['/home']);
                                  },
      error: (err: any) => { console.log(err); 
                            this.toastrService.error("Failed! Try again.");}
    });

  }

}
