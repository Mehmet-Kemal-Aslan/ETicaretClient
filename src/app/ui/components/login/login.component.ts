import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private acivatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService) {
      super(spinner)
      socialAuthService.authState.subscribe(async(user: SocialUser) => {
        debugger;
        console.log(user);
        switch(user.provider)
        {
          case "GOOGLE":
            await userService.GoogleLogin(user);
            this.authService.identityCheck();
            break;
          case "FACEBOOK":
            await userService.FacebookLogin(user);
            this.authService.identityCheck();
            break;
        }
      }) 
     }

  ngOnInit(): void{

  }

  async Login(userNameOrEmail: string, password: string)
  {
    await this.userService.login(userNameOrEmail, password);
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
    debugger;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}


