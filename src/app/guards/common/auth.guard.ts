import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';
import { inject } from '@angular/core';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';

const jwtHelper = new JwtHelperService();


export const authGuard: CanActivateFn = (route, state) => {
  //const token: string = localStorage.getItem("accessToken");
  const router = inject(Router);
  const toastrService = inject(CustomToastrService);
  //const authService = inject(AuthService);
  //const decodedToken = jwtHelper.decodeToken(token);
  //const expirationDate: Date = jwtHelper.getTokenExpirationDate(token);
  // let expired: boolean;
  // try {
  //   expired = jwtHelper.isTokenExpired(token);
  //   console.log(expired);
  // }
  // catch{
  //   expired = true;
  // }

  if(!_isAuthenticated)
  {
    router.navigate(["login"], { queryParams : { returnUrl : state.url } });
    toastrService.message("Oturum açmanız gerekmektedir!", ToastrMessageType.Warning);
  }
  return true;
};
