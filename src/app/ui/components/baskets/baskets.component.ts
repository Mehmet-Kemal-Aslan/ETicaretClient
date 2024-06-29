import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { List_Basket_Item } from 'src/app/contracts/Basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/Basket/update_basket_item';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor( spinner: NgxSpinnerService, private basketService: BasketService)
  {
    super(spinner)
  }

  basketItems: List_Basket_Item[];
  async ngOnInit(): Promise<void>{
    this.basketItems = await this.basketService.get()
  }

  async changeQuantity(object: any){
    const basketItemId: number = object.target.attributes["id"].value
    const quantity: number = object.target.value
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    console.log("changeQuantity " + basketItemId + " " + quantity);
    await this.basketService.updateQuantity(basketItem);
  }

  async removeBasketItem(basketItemId: number){
    await this.basketService.remove(basketItemId);
    setTimeout(() => {
      this.basketItems = this.basketItems.filter(item => item.basketItemId !== basketItemId);
    }, 300);
  }
}
