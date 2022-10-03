import {
  Injectable
} from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {
  Observable,
  of
} from 'rxjs';
import {
  IProductResponse
} from '../../interfaces/products/products.interface';
import {
  ProductService
} from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve < IProductResponse > {
  constructor(private productServise: ProductService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable < IProductResponse > {
    return this.productServise.getOne(Number(route.paramMap.get('id')));
  }
}