import { Component, OnDestroy, OnInit } from '@angular/core';
import { products } from "../mockdata/products";
import { ProductService  } from "../product.service";
import { CartService  } from "../cart.service";
import { Product } from "../product";
import { environment } from '../../environments/environment';
import { Subscription  } from "rxjs";

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit,OnDestroy {
  products:Product[];
  currencyCode:string = environment.currencyCode;
  subscription:Subscription ;
  loading: boolean = true;

  constructor(private productService: ProductService,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  addToCart(product:Product): void {
    this.cartService.addToCart(product);
    console.log("Product added!");
  }

  getProducts(): void {
    this.subscription = this.productService.getProducts()
      .subscribe(products => {
        this.loading = false;
        console.log(products)
        this.products = products;
      });
  }

  onNotify():void {
    window.alert('You will be notified when the product goes on sale');
  }

  ngOnDestroy(): void {
    console.log("ProductlistComponent: UnSubscribing productService")
    this.subscription.unsubscribe();
  }
}
