import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.headers.get('skipInterceptor'))
      return next.handle(req);

    const currentAuth = this.authService.getJWT();
    if (currentAuth && currentAuth.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentAuth.token}`
        }
      });
    }
    console.log(req);
    return next.handle(req);
  }
}
