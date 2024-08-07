import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrMessageType } from './services/ui/custom-toastr.service';
import { CustomToastrService } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective,{static: true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;
  title = 'ETicaretClient';
  constructor(private toastrService: CustomToastrService, 
    public authService: AuthService,
    private router: Router,
    private httpClientService: HttpClientService,
    private dynamicLoadComponentService: DynamicLoadComponentService) {
      // httpClientService.post({
      //   controller: "basket"
      // },{
      //   ProductId: 2,
      //   quantity: 30
      // }).subscribe(data => {
      //   console.log("geldim");
      //   debugger;
      // });
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

  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent,
      this.dynamicLoadComponentDirective.viewContainerRef
    )
  }
}

// $.get("https://localhost:7016/api/Products", data => {
//   console.log(data)
// })