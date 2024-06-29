import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private UserAuthService: UserAuthService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private acivatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService) {
      super(spinner)
      socialAuthService.authState.subscribe(async(user: SocialUser) => {
        ;
        console.log(user);
        switch(user.provider)
        {
          case "GOOGLE":
            await UserAuthService.GoogleLogin(user);
            this.authService.identityCheck();
            break;
          case "FACEBOOK":
            await UserAuthService.FacebookLogin(user);
            this.authService.identityCheck();
            break;
        }
      }) 
     }

  ngOnInit(): void{

  }

  async Login(userNameOrEmail: string, password: string)
  {
    await this.UserAuthService.login(userNameOrEmail, password);
    this.authService.identityCheck();
    this.acivatedRoute.queryParams.subscribe(params => {
      const returnUrl: string = params["returnUrl"];
      if(returnUrl)
      {
        this.router.navigate([returnUrl]);
      }
    });
  }

  facebookLogin()
  {
    
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}


