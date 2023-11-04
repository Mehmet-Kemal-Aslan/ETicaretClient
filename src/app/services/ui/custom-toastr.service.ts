import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr?: ToastrService) { }
  message(message: String, ToastrMessageType)
  {
    this.toastr[ToastrMessageType](message);
  }
}



export enum ToastrMessageType{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}
