
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from '../model/loginDTO';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../services/messageService.service';
import { Observable } from 'rxjs';
import { JwtServiceService } from '../services/jwt-service.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/loginResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  loginDTO!: LoginDTO;
  loginResponse!: LoginResponse;

  public message!: String;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    public jwtService: JwtServiceService,
    public messageService: MessageService,
    private router: Router,
    private  toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5),]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }



  onSubmit() {
    console.log(this.loginForm);
    this.loginDTO = Object.assign({}, this.loginForm.value)
    if (this.loginForm.valid) {
      console.log("Before login jwt token is :", this.jwtService.getToken());
      this.jwtService.destroyToken();
      this.authService.login(this.loginDTO)
        .subscribe({
          next: (result: LoginResponse) => {
            this.jwtService.saveToken(result.token);
            console.log(result.id);
            this.authService.idUser = result.id;

            if (this.loginDTO.username == "admin") {
              this.authService.logged("ADMIN");
            } else {
              this.authService.logged("USER");
            }
            this.toastrService.success("Successfully login. Uloga je: "+ this.authService.getRole()+"logovan : " + this.authService.isLogin);
            this.router.navigate(['/home']);
            console.log("Successfully login : jwt token is :", this.jwtService.getToken(),
              ", ", this.authService.isLogin);
          },
          error: (err: HttpErrorResponse) => {
            this.messageService.message = err.error;
            this.toastrService.error("Login failed");

            console.log("Filed to login");
          }
        });
    } else {
      this.messageService.message = 'Stock form is in an invalid state';
      console.error('Stock form is in an invalid state');
    }
  }
}
