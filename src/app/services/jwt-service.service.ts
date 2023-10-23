import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
  getToken(): String {
    return localStorage.getItem('jwtToken')||'';
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken',token);
  }

  destroyToken(): void {
    localStorage.removeItem("jwtToken");
  }
}
