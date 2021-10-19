import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { environment } from '../../environments/environment';
import { Subscription } from "rxjs";
import { Product } from "../product";
import { CartItems } from "../cart-items";

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit, OnDestroy {
  cartTotal: number = 0;
  items: CartItems[] = []; // Internal List
  itemsCount: number = 0;
  showCartDetails: boolean = false;
  currencyCode: string = environment.currencyCode;
  subscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.setCartDetails();
  }

  setCartDetails(): void {
    console.log("in setCartDetails()")
    this.subscription = this.cartService.getCartContentsObservable().subscribe(cartContents => {
      console.log("in cartService.Subscription")
      this.items = cartContents;
      this.itemsCount = cartContents.length;
      this.showCartDetails = (cartContents.length > 0);
      this.cartTotal = 0; // Lets recalculate the price now
      cartContents.forEach(item => {
        this.cartTotal += (item.product.price * item.qty);
      })
      console.log(`Cart items:`, cartContents)
      console.log(`Show details:`, (cartContents.length > 0))
      console.log(`Cart Total: ${this.cartTotal}`)
    });
    this.cartService.getLatestCartContents(); // To get the latest changes
  }

  onRemoveItem(index: number): void {
    this.cartService.removeItem(index);
  }

  onQtyChange(index: number, event:any): void {
    let qty = Number(event.target.value);
    console.log("New Qty:",qty);
    if(qty > 0 && qty <= 10)
      this.cartService.updateQty(index, qty);
  }

  ngOnDestroy(): void {
    console.log("CartCheckoutComponent: UnSubscribing Cart Service")
    this.subscription.unsubscribe();
  }
}
