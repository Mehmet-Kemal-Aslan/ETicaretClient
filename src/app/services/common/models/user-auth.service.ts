import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService) { }
  async login(userNameOrEmail: string, password: string): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, {userNameOrEmail, password})

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse)
    {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      console.log("Giriş tamam\n" + tokenResponse);
    }
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void) : Promise<any>
  {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshtokenlogin",
      controller:"auth"
    }, {refreshToken: refreshToken});

    try{
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

      if(tokenResponse){
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
        console.log("Giriş tamam\n" + tokenResponse);
      }
      callBackFunction(tokenResponse? true : false);
    }
    catch{
      callBackFunction(false);
    }
  }

  async GoogleLogin(user: SocialUser) : Promise<any>
  {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse)
    {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      console.log("Google üzerinden giriş tamam\n" + tokenResponse);
    }
  }

  async FacebookLogin(user: SocialUser) : Promise<any>
  {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "facebook-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse)
    {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      console.log("Facebook üzerinden giriş tamam\n" + tokenResponse);
    }
  }
}
