import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.status)
      {
        case HttpStatusCode.Unauthorized:
          const url = this.router.url;
          if(url == "/products"){
            this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekli.",
              ToastrMessageType.Warning,
            )
          }
          else{
            this.toastrService.message("Bu işlem için yetkiniz bulunmamaktadır.", ToastrMessageType.Warning);
          }
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {
            
          })
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
