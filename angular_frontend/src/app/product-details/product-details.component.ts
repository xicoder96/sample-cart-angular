import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { environment } from '../../environments/environment';
import { Subscription  } from "rxjs";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  product;
  currencyCode:string = environment.currencyCode;
  subscription:Subscription ;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private location: Location
  ) { 
    this.getProductDetails();
  }

  ngOnInit(): void {
  }

  getProductDetails():void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    // Find the product that correspond with the id provided in route.
    this.subscription = this.productService.getProductDetails(productIdFromRoute).subscribe(product => {
      this.product = product;
    })
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
    console.log("Product added!");
  }

  onNotify(): void {
    window.alert('You will be notified when the product goes on sale');
  }
  goBack(): void {
    this.location.back()
  }
  ngOnDestroy(): void {
    console.log("CartCheckoutComponent: UnSubscribing Cart Service")
    this.subscription.unsubscribe();
  }
}
