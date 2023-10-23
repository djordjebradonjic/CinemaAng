import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { JwtServiceService } from '../services/jwt-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly jwtService: JwtServiceService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = this.jwtService.getToken();
    if (!token) {
      return next.handle(request);
    }
     request = request.clone({
      
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
       'Accept'       : 'application/json',
        'Authorization': `Bearer ${token}`,
      },
   });
    console.log(request)
   return next.handle(request);   
  }
}
