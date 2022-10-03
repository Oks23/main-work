import {
  Component,
  OnInit
} from '@angular/core';
import {
  IProductResponse
} from 'src/app/shared/interfaces/products/products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import {
  ProductService
} from 'src/app/shared/services/product/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userProducts: Array < IProductResponse >= [];
  
  constructor(
    private productService: ProductService,
    private orderService:OrderService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllByCategory('роли').subscribe(data => {
      this.userProducts = data;
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

//info that product added to cart
     Swal.fire({
      title: 'Товар додано у кошик!',
      text: 'Бажаєте оформити замовлення?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Перейти до оформлення',
      cancelButtonText: 'Я перегляну ще інші товари',
    }).then((result) => {
      if (result.value) {
        window.location.href = "https://oks23.github.io/main-work/checkout";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      }
    });
  }


}