import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { JwtServiceService } from './services/jwt-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService:AuthService,
              public router:Router,
              private toastService:ToastrService,
              private jwtService:JwtServiceService){

  }
  
  title = 'cinema-app';

  logOut(){
    this.authService.logout();
    this.toastService.info("You are logout now");

    this.router.navigate(['/login']);

  }


  
}
