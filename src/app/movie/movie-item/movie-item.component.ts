import { Component, Input, OnInit } from '@angular/core';
import { MovieResponse } from '../../model/movieResponse';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDTO } from 'src/app/model/movieDto';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input() movie!: MovieResponse;

  userLogIn: boolean = localStorage.getItem('ROLE') === 'USER';
  adminLogIn:boolean= localStorage.getItem('ROLE') ==='ADMIN';
  constructor(private movieService: MovieService,
    private dialog: MatDialog,
    private toastrService: ToastrService) {

  }
  ngOnInit(): void {

  }

  openPopUp() {
    this.dialog.open(CreateReservationComponent, {
      width: '60%',
      enterAnimationDuration: "1000ms",
      exitAnimationDuration: "1000ms",
      data: {
        title: this.movie.name,
      }

    })
  }

  deleteMovie() {
    console.log("Deleting function");
    this.movieService.deleteById(this.movie.id).subscribe({

      next: (res:String) => { this.toastrService.success("Deleted movie with id:" + this.movie.id); 
                              this.movie.deleted=true;},
      error: (err: any) => {
        console.log(err);
        this.toastrService.error("This movie cannot be deleted because there are active projections for that movie");
      }
    })
  }


}






