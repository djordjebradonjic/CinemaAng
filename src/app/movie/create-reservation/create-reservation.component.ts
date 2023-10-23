import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectionResponse } from 'src/app/model/projectionResponse';
import { ReservationRequest } from 'src/app/model/reservationRequest';
import { ReservationResponse } from 'src/app/model/reservationResponse';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectionService } from 'src/app/services/projection.service';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

  reservationForm!: FormGroup;
  projections!: ProjectionResponse[];
  movieName!: string;
  movieId!: number;
  reservationRequest!: ReservationRequest;

  inputData: any;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private projectionService: ProjectionService,
    private authService: AuthService,
    private ref: MatDialogRef<CreateReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router :Router,
    private toasterService:ToastrService

  ) {

  }
  ngOnInit(): void {
    this.inputData = this.data;
    this.projectionService.findAllAvailable().subscribe({

      next: (response: ProjectionResponse[]) => {
        this.projections = response;
        console.log("OKej", response);
      },
      error: (err: any) => {
        console.log(err);
      }

    });
    this.reservationForm = this.fb.group({

      projectionId: ['',[Validators.required]],
      userId: [''],
      numberOfTickets: ['',[Validators.max(5),Validators.required]],
    })
  }

  closePopUp() {
    this.ref.close();
  }


  onSubmit() {
    console.log(this.reservationForm.value);
    this.reservationForm.controls['userId'].setValue(this.authService.idUser);
    console.log(this.reservationForm.value);
    this.reservationRequest = Object.assign({}, this.reservationForm.value);
    this.reservationService.create(this.reservationRequest).subscribe({

      next: (response: ReservationResponse) => {
        console.log(response);
        this.toasterService.success("Created new projection: id= "+ response.id); 
        this.router.navigate(['/home']);
      },
      error: (err: any) => { console.log(err); }
    });
  }




}
