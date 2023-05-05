import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
  user?: string | null;
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.userChange.subscribe(user => {
      this.user = user
    })
    if (this.user) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.user}`,
        },
      });
    }
    return next.handle(req).pipe(catchError(event=>{
      if(event instanceof HttpErrorResponse){
        if(event.status === 401){
          this.authService.logout();
        }
      }
      throw event;
    }));
  }
}