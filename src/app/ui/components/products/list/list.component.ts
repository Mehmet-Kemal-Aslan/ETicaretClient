import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageType } from '@microsoft/signalr';
import { Create_Basket_Item } from 'src/app/contracts/Basket/create_basket_item';
import { BaseUrl } from 'src/app/contracts/baseUrl';
import { List_Product } from 'src/app/contracts/list_products';
import { Position } from 'src/app/services/admin/alertify.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService, 
    private basketService: BasketService, private customToastrService: CustomToastrService ) {}
  
  currentPageNo: number;
  totalPageCount: number;
  totalProductCount: number;
  pageSize: number = 2;
  pageList: number[] = [];
  products: List_Product[];
  baseUrl: BaseUrl;

  async ngOnInit()
  {
    this.baseUrl = await this.fileService.GetBaseStorageUrl();
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: {totalProductCount: number, products: List_Product[]} = await this.productService.read(this.currentPageNo - 1, this.pageSize, () => 
      {
        
      },
      errorMessage => 
      {

      });

      this.products = data.products;
      
      this.products = this.products.map<List_Product>(p => {
        const productImageFiles = p.productImageFiles || [];
        const showcaseImage = productImageFiles.find(img => img.showcase);
        const listProduct : List_Product = {
          id: p.id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          imagePath: showcaseImage ? showcaseImage.path : "",
          //imagePath: `${this.fileService.GetBaseStorageUrl()}/${showcaseImage ? showcaseImage.path : ""}`,
          createdDate: p.createdDate,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
        };
        // console.log('Product ID:', p.id, 'Product Image Files:', productImageFiles);
        // console.log('Product ID:', p.id, 'Showcase Image:', showcaseImage);
        // console.log('path:', listProduct.imagePath); 
        return listProduct;
      });

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

  async addToBasket(product: List_Product){
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.customToastrService.message("Ürün sepete eklendi",
      ToastrMessageType.Success
    )
  }
}
