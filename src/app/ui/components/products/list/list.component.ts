import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from 'src/app/contracts/list_products';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {}
  
  currentPageNo: number;
  totalPageCount: number;
  totalProductCount: number;
  pageSize: number = 2;
  pageList: number[] = [];
  products: List_Product[]
  async ngOnInit()
  {
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(this.currentPageNo - 1, this.pageSize, () => 
      {
        
      },
      errorMessage => 
      {

      });
      this.products = data.products;
      this.totalProductCount = data.totalProductCount
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
      for (let i = 1; i <= 7; i++)
        this.pageList.push(i);

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    })
  }
}
