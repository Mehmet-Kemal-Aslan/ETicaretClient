import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrMessageType } from './services/ui/custom-toastr.service';
import { CustomToastrService } from './services/ui/custom-toastr.service';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService: CustomToastrService) {
    toastrService.message("Merhaba ben toastr", ToastrMessageType.Info,);
    toastrService.message("Merhaba ben toastr", ToastrMessageType.Error);
    toastrService.message("Merhaba ben toastr", ToastrMessageType.Warning);
    toastrService.message("Merhaba ben toastr", ToastrMessageType.Success);
  }
}


