import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Product } from "./product";
import { CartItems } from "./cart-items";
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItems[] = []; // Internal List
  cartContents: Subject<CartItems[]> = new Subject<CartItems[]>();

  constructor(
    private messageService: MessageService) { }

  /**
   * Add new item to cart
   * @param product New Product
   */
  addToCart(product: Product): void {
    this.items.push({ product: product, qty: 1 })
    this.cartContents.next(this.items);
    this.log(`Item added !!`);
    console.log(`Cart Items :`, this.items)
  }

  /**
   * Get Cart Contents As Observable
   */
  getCartContentsObservable(): Observable<CartItems[]> {
    return this.cartContents.asObservable();
  }

  /**
   * Get the latest cart contents
   */
  getLatestCartContents(): void {
    this.cartContents.next(this.items);
    this.log("Cart Status contents refreshed")
  }

  /**
   * Remove an item from the cart
   * @param index Index of Item to be deleted
   */
  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.cartContents.next(this.items);
    this.log("An Item removed & cart updated !!")
  }

  /**
   * Update Qty of items
   * @param index index of the item to be update
   * @param qty new Qty
   */
  updateQty(index: number, qty: number): void {
    if (typeof this.items[index] !== "undefined") {
      this.items[index].qty = qty;
      this.cartContents.next(this.items);
      this.log("An Item qty updated!!!");
    }
  }

  /**
   * Is Cart Empty?
   */
  isEmpty(): boolean {
    return this.items.length < 1;
  }

  /**
   * Clear Cart
   */
  clearCart(): void {
    this.items = [];
    this.cartContents.next(this.items);
  }

  /**
   * Check if exists, if it does increment qty else add 
   * @param product cart product
   */
  private checkAndAdd(product: Product): void {
    /* if (this.items.find(item => item.product.id === product.id)) {
       // item exists
       this.items = this.items.map(item => {
         if (product.id === item.product.id)
           item.qty++; // increases qty
         return item;
       })
       return;
     }*/
    // new item
    this.items.push({ product: product, qty: 1 })
  }

  /** Log a CartService message with the MessageService */
  private log(message: string): void {
    console.log(`CartService: ${message}`);
    this.messageService.add(`CartService: ${message}`);
  }
}
