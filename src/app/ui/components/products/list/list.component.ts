import { Component } from '@angular/core';
import { List_Product } from 'src/app/contracts/list_products';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(private productService: ProductService) {}
  products: List_Product[]
  async ngOnInit()
  {
    const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(0,12, () => 
    {
      
    },
    errorMessage => 
    {

    });
    this.products = data.products;
  }
}
