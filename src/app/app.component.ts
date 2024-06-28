import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrMessageType } from './services/ui/custom-toastr.service';
import { CustomToastrService } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService: CustomToastrService, 
    public authService: AuthService,
    private router: Router,
    private httpClientService: HttpClientService) {
      httpClientService.put({
        controller: "basket"
      },{
        id: 3,
        quantity: 15
      }).subscribe(data => {
        console.log("geldim");
        debugger;
      });
    authService.identityCheck();
    // toastrService.message("Merhaba ben toastr", ToastrMessageType.Info,);
    // toastrService.message("Merhaba ben toastr", ToastrMessageType.Error);
    // toastrService.message("Merhaba ben toastr", ToastrMessageType.Warning);
    // toastrService.message("Merhaba ben toastr", ToastrMessageType.Success);
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturumunuz kapatılmıştır", ToastrMessageType.Warning);
  }
}

$.get("https://localhost:7016/api/Products", data => {
  console.log(data)
})