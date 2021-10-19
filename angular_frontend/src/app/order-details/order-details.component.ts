import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from "../order.service";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderDetails: any;
  currencyCode: string = environment.currencyCode;
  showDetails: boolean = false;
  loading: boolean = true;
  subscription: Subscription;
  totalAmount: number = 0;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {
    console.log("constructor")
    this.setOrderDetails();
  }

  ngOnInit(): void {
    console.log("ngOnInit")
  }

  setOrderDetails(): void {
    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = routeParams.get('orderId');
    // Find the Orderthat correspond with the id provided in route.
    this.subscription = this.orderService.getOrderDetails(orderIdFromRoute).subscribe(orderDetails => {
      this.loading = false;
      console.log("Order Details:", orderDetails);
      if (orderDetails) {
        this.showDetails = true;
        this.orderDetails = orderDetails;
        orderDetails.cartDetails.forEach(item => {
          this.totalAmount += (item.product.price * item.qty);
        });
        console.log("Total Amount:", this.totalAmount)
      }
    })

  }
  ngOnDestroy(): void {
    console.log("OrderDetailsComponent: UnSubscribing Cart Service")
    this.subscription.unsubscribe();
  }
}
