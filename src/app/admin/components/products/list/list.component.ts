import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_products';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor( spinner: NgxSpinnerService, private productservice: ProductService, private alertifyService: AlertifyService ) {
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit()
  {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts: List_Product[] = await this.productservice.read(() => this.hideSpinner(SpinnerType.BallAtom), errorMessage => 
    this.alertifyService.message(errorMessage,
    {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    } ))
    this. dataSource = new MatTableDataSource<List_Product>(allProducts);
    this.dataSource.paginator = this.paginator;
  }
}
