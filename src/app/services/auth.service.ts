import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserRequestDTO } from '../model/registerDto';
import { Observable } from 'rxjs';
import { LoginDTO } from '../model/loginDTO';
import { JsonPipe } from '@angular/common';
import { LoginResponse } from '../model/loginResponse';
import { RegisterResponse } from '../model/registerResponse';
import { JwtServiceService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  isLogin: boolean = false;
  idUser!: number;

  constructor(private http: HttpClient,private jwtService:JwtServiceService) { 
   // localStorage.setItem('ROLE','');
    
  }
  ngOnInit(): void {
   
  }
  httpOptions: object = {
    responseType: 'text'
  };

  public register(userReguestDto: UserRequestDTO): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>("http://localhost:8080/auth/registration", userReguestDto);
  }


  public login(loginDTO: LoginDTO): Observable<LoginResponse> {

    return this.http.post<LoginResponse>("http://localhost:8080/auth/login", loginDTO);

  }




  logged(role: string) {
    this.isLogin = true;
    localStorage.setItem('ROLE', role);
    console.log("Success logged, role is set to: ", localStorage.getItem('ROLE'));
  }

  logout() {
    this.isLogin = false;
    localStorage.setItem('ROLE', '');
    console.log("Logout");
    this.jwtService.destroyToken();
    this.idUser=0;
  }


  getRole() {
    return localStorage.getItem('ROLE');
    
  }

}
