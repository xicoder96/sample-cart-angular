import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Subscription  } from "rxjs";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit,OnDestroy {
  itemsCount: Number = 0;
  subscription:Subscription ;
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.setItemCount();
  }

  private setItemCount(): void {
    this.subscription = this.cartService.getCartContentsObservable().subscribe(cartContents => {
      this.itemsCount = cartContents.length;
      console.log(`Observing Cart items count: ${this.itemsCount}`)
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe
    console.log("TopbarComponent: UnSubscribing Cart Service")
    this.subscription.unsubscribe();
  }
}
