import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { List_Basket_Item } from 'src/app/contracts/Basket/list_basket_item';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_Basket_Item } from 'src/app/contracts/Basket/create_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/Basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }
  async get(): Promise<List_Basket_Item[]>{
    const observable: Observable<List_Basket_Item[]> = this.httpClientService.get({
      controller: "basket",
    });
    return await firstValueFrom(observable)
  }

  async add(basketItem: Create_Basket_Item): Promise<void>{
    const observable: Observable<any> = this.httpClientService.post({
      controller: "basket",
    }, basketItem);
    await firstValueFrom(observable)
  }

  async updateQuantity(basketItem: Update_Basket_Item): Promise<void>{
    //console.log("updateQuantity");
    const observable: Observable<any> = this.httpClientService.put({
      controller: "basket",
    }, basketItem);
    await firstValueFrom(observable);
  }

  async remove(BasketItemId: number) {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: "basket"
    }, BasketItemId);

    await firstValueFrom(observable);
  }
}
