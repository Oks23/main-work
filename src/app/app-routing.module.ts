import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AboutComponent } from './pages/about/about.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AuthorizationComponent } from './pages/authorization/authorization.component';

import { AccountComponent } from './account/account.component';
import { UserHistoryComponent } from './account/user-history/user-history.component';
import { UserPasswordComponent } from './account/user-password/user-password.component';
import { UserComponent } from './account/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount/:id', component: DiscountInfoComponent,
      resolve:{discountInfo:DiscountInfoResolver} },
  { path: 'product/:category', component: ProductComponent },
  { path: 'product/:category/:id', component: ProductInfoComponent,
      resolve:{productInfo:ProductInfoResolver} },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'offerta', component: OffertaComponent },
  { path: 'checkout', component: CheckoutComponent },

  {
    path: 'account', component: AccountComponent,  children: [
      { path: 'office', component: UserComponent },
      { path: 'history', component: UserHistoryComponent },
      { path: 'password', component: UserPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'office' },
    ]
  },

  { path:'auth',component:AuthorizationComponent},
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], children: [
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'discount', component: AdminDiscountComponent },
    { path: 'order', component: AdminOrderComponent },
    { path: '', pathMatch: 'full', redirectTo: 'discount' },
    { path: '', pathMatch: 'full', redirectTo: 'office' }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
