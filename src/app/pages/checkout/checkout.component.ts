import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public basket: Array < IProductResponse > = [];
  public total = 0;
  public count = 0;
  public comment = false;
  public commentKitchen = false;
  public delivery = false;
  public getOwnAway = false;
  public soonerGetAway = false;
  public submittedOrder = false;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count * prod.price, 0);
    this.count = this.basket.reduce((total: number, prod: IProductResponse) =>
      total + prod.count, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.getTotalPrice();
  }
  //deleting item from basket 
  deleteFromBasket(product: IProductResponse): void {
    this.basket = JSON.parse(localStorage.getItem('basket') as string);
      if (this.basket.some(prod => prod.id === product.id)) {
        const index =  this.basket.findIndex(prod => prod.id === product.id);
this.basket.splice(index);
localStorage.setItem('basket', JSON.stringify(this.basket));
this.updateBasket();
this.getTotalPrice();
      } 
    } 

  clear(){
    localStorage.clear();
    this.updateBasket();
    this.loadBasket();
    this.submittedOrder = true;
  }
  commentChange(): void {
    this.comment = !this.comment;
  }
  commentKitchenChange(): void {
    this.commentKitchen = !this.commentKitchen;
  }

  deliveryChange() {
    this.delivery = true;
    this.getOwnAway = false;
    this.soonerGetAway = false;
  }

  getOwnAwayChange() {
    this.getOwnAway = true;
    this.soonerGetAway = false;
    this.delivery = false;
  }

  soonerGetAwayChange() {
    this.soonerGetAway = true;
    this.getOwnAway = false;
    this.delivery = false;
  }
}
