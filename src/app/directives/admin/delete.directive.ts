import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'src/app/services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    public alertifyService: AlertifyService,
    private dialogservice: DialogService) { 
      const img = _renderer.createElement("img")
      img.setAttribute("src", "../../../../../../assets/delete.png")
      img.setAttribute("style", "cursor: pointer")
      img.width = 25;
      img.height = 25;
      _renderer.appendChild(element.nativeElement, img)
    }

    @Input() id: number
    @Input() controller: string
    @Output() callback: EventEmitter<any> = new EventEmitter();
    @HostListener("click")
    async onclick()
    {
      this.dialogservice.openDialog({
        componentType: DeleteDialogComponent,
        data: DeleteState.Yes,
        afterClosed: async() =>
        {
          const td: HTMLTableElement = this.element.nativeElement;
          //await this.productService.delete(this.id);
          this.httpClientService.delete(
            {
              controller: this.controller
            },this.id
          ).subscribe(data => 
            {
              $(td.parentElement).fadeOut( () => {
                this.callback.emit();
                this.alertifyService.message("Ürün silinmiştir.",
                {
                  dismissOthers: true,
                  messageType: MessageType.Success,
                  position: Position.TopRight
                })
            })
          },(errorResponse: HttpErrorResponse) => 
          {
            this.alertifyService.message("Ürün silinememiştir.",
            {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          });
        }
      });
    }
      
    // openDialog(afterClosed: any): void {
    //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //     data: DeleteState.Yes,
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     if(result == DeleteState.Yes)
    //       afterClosed();
    //   });
    // }
}




