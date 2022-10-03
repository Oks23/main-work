import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  ROLE
} from 'src/app/shared/constants/role.constants';
import {
  IProductResponse
} from 'src/app/shared/interfaces/products/products.interface';
import {
  AccountService
} from 'src/app/shared/services/account/account.service';
import {
  OrderService
} from 'src/app/shared/services/order/order.service';
import {
  ProductService
} from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public basket: Array < IProductResponse > = [];
  public total = 0;
  public count = 0;
  public isOpen = false;
  public isLogin = true;
  public loginUrl = '';
  public loginPage = '';
  public callUser = false;
  public visibile_block!: string;

  public not_visibile_block!: string;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService
    // private activatedRoute: ActivatedRoute,
    // private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesLogin()
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

  openModal(): void {
    this.isOpen = !this.isOpen;
  }

  closeModal(value: boolean): void {
    if (value) {
      this.isOpen = false;
    } else {
      this.isOpen = !this.isOpen;
    }
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

  //show user ROLE in header
  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Адмін';

    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'account';
      this.loginPage = 'Юзер';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  status: boolean = false;

  callBtn(): void {
    this.callUser = !this.callUser;
    if (this.callUser) {
      this.visibile_block = 'display: block; opacity: 1; visibility: visible;';
      this.not_visibile_block = '';
      document.body.style.overflow = 'hidden';
      this.status = !this.status;
    } else {
      this.status = !this.status;
      this.visibile_block = '';
      document.body.style.overflow = 'visible';
    }
  }
}