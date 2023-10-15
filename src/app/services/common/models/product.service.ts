import { Injectable } from '@angular/core';
import { Create_Product } from '../../../contracts/create_product'
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_products';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Images } from 'src/app/contracts/list_product_images';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: any)
  {
    this.httpClientService.post({
      controller: "products"
    },product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse ) => {
      const _error: Array<{key: string, value: Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v,_index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (erroMessage: 
    string) => void ): Promise<{totalCount: number; products: List_Product[]}>
  {
    const promiseData: Promise<{totalCount: number; products: List_Product[]}> = this.httpClientService.get<
    {totalCount: number, products: List_Product[]}>(
      {
        controller: "products",
        queryString: `page=${page}&size=${size}`
      }
    ).toPromise();

    promiseData.then(d => successCallBack() )
    .catch( (errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message) )

    return await promiseData;
  }

  async delete(id: number)
  {
    const deleteObservable: Observable <any> = this.httpClientService.delete<any>(
    {
      controller: "products"
    }, id)
    var a = await firstValueFrom(deleteObservable);
  }

  async readImages(id: number): Promise<List_Product_Images[]>
  {
    const getObservable: Observable<List_Product_Images[]> = this.httpClientService.get<List_Product_Images[]>({
      action: "GetProductImages",
      controller: "products"
    }, id);

    return await firstValueFrom(getObservable);
  }

  async deleteImage(id: number, imageId: number, )
  {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
  }

}
