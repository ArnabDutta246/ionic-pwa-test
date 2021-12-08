import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {
  constructor() {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept')
        console.error(error);
        return throwError(error.message);
      })
    )
  }
}
