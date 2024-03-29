import { Component, Input } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(private httpClientService: HttpClientService,
              private alertifyService: AlertifyService,
              private customToastrService: CustomToastrService,
              private dialog: MatDialog,
              private dialogService: DialogService) { }

  public files: NgxFileDropEntry[] = [];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for(const file of files) 
    {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => 
      {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService.post(
          {
            controller: this.options.controller,
            action: this.options.action,
            queryString: this.options.queryString,
            headers: new HttpHeaders({"responseType": "blob"})
          }, fileData
        ).subscribe(data => {
          const successMessage = "Dosyalar başarıyla yüklenmiştir."
          if(this.options.isAdminPage)
          {
            this.alertifyService.message(successMessage,
            {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          }
          else{
            this.customToastrService.message(successMessage,
            {
              MessageType: MessageType.Success,
              Position: Position.TopRight
            })
          }
        },(errorResponse: HttpErrorResponse) =>{
          const errorMessage = "Dosyalar yüklenememiştir ."
          if(this.options.isAdminPage)
          {
            this.alertifyService.message(errorMessage,
            {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          }
          else{
            this.customToastrService.message(errorMessage,
            {
              MessageType: MessageType.Error,
              Position: Position.TopRight
            })
          }
        });
      }
    })
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     data: FileUploadDialogState.Yes,
  //   });
    
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result == FileUploadDialogState.Yes)
  //       afterClosed();
  //   });
  // }
}


export class FileUploadOptions
{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}