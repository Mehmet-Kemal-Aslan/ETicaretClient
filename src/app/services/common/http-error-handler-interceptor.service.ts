import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.status)
      {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlem için yetkiniz bulunmamaktadır.", ToastrMessageType.Warning);
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilemiyor.", ToastrMessageType.Warning);
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek.", ToastrMessageType.Warning);
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı.", ToastrMessageType.Warning);
          break;
        default:
          this.toastrService.message("Hata.", ToastrMessageType.Warning);
          break;
      }
      return of(error);
    }
    ))
  }
}
