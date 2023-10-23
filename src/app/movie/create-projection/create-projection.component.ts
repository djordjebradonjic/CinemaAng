import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectionDTO } from '../../model/projectionDTO'
import { MovieResponse } from 'src/app/model/movieResponse';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';
import { TheaterService } from 'src/app/services/theater.service';
import { TheaterDTO } from 'src/app/model/theaterDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectionResponse } from 'src/app/model/projectionResponse';
import { ProjectionService } from 'src/app/services/projection.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-create-projection',
  templateUrl: './create-projection.component.html',
  styleUrls: ['./create-projection.component.css']
})
export class CreateProjectionComponent implements OnInit {

  projectionForm!: FormGroup;
  projectionDTO!: ProjectionDTO;
  public movies!: MovieResponse[];
  public theaters!: TheaterDTO[];
  projectionResponse!: ProjectionResponse;

  constructor(private fb: FormBuilder,
    private movieService: MovieService,
    private theaterService: TheaterService,
    private projectionService: ProjectionService,
    private  toastrService: ToastrService) {
  }


  ngOnInit(): void {
    this.movieService.getAll().subscribe({

      next: (value: MovieResponse[]) => {
        this.movies = value;
        console.log(this.movies)
      }
      , error: (error: HttpErrorResponse,) => {
        alert(error.message);
      }
    });
    this.theaterService.getAll().subscribe({

      next: (value: TheaterDTO[]) => {
        this.theaters = value;
        console.log(this.theaters)
      }
      , error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }
    );


    this.projectionForm = this.fb.group({

      startTime: [''],
      ticketPrice: [''],
      movieId: [''],
      theaterId: ['']
    });


  }


  onSubmit() {
    this.projectionDTO = Object.assign({}, this.projectionForm.value);
    if (this.projectionForm.valid) {
      this.projectionService.createProjection(this.projectionDTO).subscribe({

        next: (res: ProjectionResponse) => { this.projectionResponse = res;
                                            this.toastrService.success("Created new projection: id= "+ this.projectionResponse.id); },
        error: (error: any) => { console.log(error); 
                                  this.toastrService.error("Failed to create! Try again");}
      })
    }
  }
}