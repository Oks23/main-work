import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  IProductResponse
} from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import {
  ProductService
} from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public currentProduct!: IProductResponse;

  constructor(
    private orderService:OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response.productInfo; 
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  //check if there is something in the basket add to local storage
  addToBasket(product: IProductResponse): void {
    let basket: Array < IProductResponse >= [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }


}