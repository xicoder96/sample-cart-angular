import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CartService } from "./cart.service";

@Injectable({
  providedIn: 'root'
})
export class IsCartEmptyGuard implements CanActivate {
  constructor(private cartService: CartService) { }

  canActivate(): boolean {
    console.log("this page is protected by IsCartEmptyGuard")
    if (this.cartService.isEmpty()) {
      console.log("access restricted !")
      return false;
    }
    return true;
  }

}
