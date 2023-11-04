import { Component, Inject, Output, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { List_Product_Images } from 'src/app/contracts/list_product_images';
import { ProductService } from 'src/app/services/common/models/product.service';


@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit 
  {
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService)
  {
    super(dialogRef)
  }
  
  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmini yükleyiniz.",
    isAdminPage: true,
    queryString: `id=${this.data}` 
  }

  //x = [1,1,1,1];

  images: List_Product_Images[];

  async ngOnInit() {
    this.images = await this.productService.readImages(this.data as number);
    console.log(this.images)
  }


  async deleteImage(imageId: number)
  { 
    await this.productService.deleteImage(this.data as number, imageId);
  }
}



export enum SelectProductImageState
{
  Close
}