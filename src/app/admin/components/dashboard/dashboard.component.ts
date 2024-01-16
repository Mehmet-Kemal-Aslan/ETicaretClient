import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from 'src/app/services/common/signalr.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { hubUrls } from 'src/app/constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor( spinner: NgxSpinnerService, private signalRService: SignalRService)
  {
    super(spinner)
    signalRService.start(hubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      alert(message);
    })
    //this.showSpinner(SpinnerType.BallAtom);
  }
}
