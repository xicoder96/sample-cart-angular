import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { CheckoutOrderComponent } from './checkout-order/checkout-order.component';
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { IsCartEmptyGuard } from "./is-cart-empty.guard";

const routes: Routes = [
  { path: '', component: ProductlistComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'viewcart', component: CartCheckoutComponent },
  { path: 'checkout', component: CheckoutOrderComponent, canActivate: [IsCartEmptyGuard] },
  { path: 'orders/:orderId', component: OrderDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
