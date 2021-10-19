import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../order.service";
import { CartService } from '../cart.service';
import { Subscription } from "rxjs";
import { CartItems } from "../cart-items";
import { OrderDetails } from '../order-details';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.css'],
})
export class CheckoutOrderComponent implements OnInit, OnDestroy {
  isLinear = true;
  userInfoFormGroup: FormGroup;
  deliveryInfoFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  paymentStatus: boolean = true;
  submitted: boolean = false;
  subscriptions: Subscription[] = [];
  cartContents: CartItems[];

  constructor(
    private _formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userInfoFormGroup = this._formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.email,
          Validators.maxLength(25),
        ],
      ],
      mobile: [
        null,
        [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)],
      ],
    });
    this.deliveryInfoFormGroup = this._formBuilder.group({
      del_fullName: [null, Validators.required],
      del_mobileno: [
        null,
        [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)],
      ],
      del_pincode: [null, [Validators.required, Validators.minLength(4)]],
      del_flatno: [null, [Validators.required, Validators.minLength(4)]],
      del_area: [null, [Validators.required, Validators.minLength(4)]],
      del_city: [null, [Validators.required, Validators.minLength(4)]],
      del_state: [null, [Validators.required]],
    });
    this.getCartDetails();
  }

  getCartDetails() {
    let subscription = this.cartService.getCartContentsObservable().subscribe(cartContents => {
      this.cartContents = cartContents;
    });
    this.cartService.getLatestCartContents(); // To get the latest changes
    this.subscriptions.push(subscription);

  }

  // convenience getter for easy access to form fields
  get userInfoControls() {
    return this.userInfoFormGroup.controls;
  }
  get deliveryInfoControls() {
    return this.deliveryInfoFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userInfoFormGroup.invalid || this.deliveryInfoFormGroup.invalid) {
      return;
    }
    // display form values on success
    console.log('userInfoFormGroup ', this.userInfoFormGroup.value);
    console.log('deliveryInfoFormGroup', this.deliveryInfoFormGroup.value);
    let orderDetails: OrderDetails = {
      email: String(this.userInfoFormGroup.value.email),
      mobileno: String(this.userInfoFormGroup.value.mobile),
      deliveryAddress: {
        fullName: String(this.deliveryInfoFormGroup.value.del_fullName),
        mobileNo: String(this.deliveryInfoFormGroup.value.del_mobileno),
        pincode: String(this.deliveryInfoFormGroup.value.del_pincode),
        flatNo: String(this.deliveryInfoFormGroup.value.del_flatno),
        area: String(this.deliveryInfoFormGroup.value.del_area),
        city: String(this.deliveryInfoFormGroup.value.del_city),
        state: String(this.deliveryInfoFormGroup.value.del_state),
      },
      cartDetails: this.cartContents,
      paymentStatus: this.paymentStatus
    }
    let subscription = this.orderService.addOrder(orderDetails).subscribe(response => {
      console.log("Response :", response);
      this.cartService.clearCart();
      this.router.navigate([`orders/${response.id}`]);
    })
    this.subscriptions.push(subscription);
    alert('SUCCESS!! :-)\n\n');
  }

  onReset() {
    this.submitted = false;
    this.userInfoFormGroup.reset();
    this.deliveryInfoFormGroup.reset();
    console.log('Register Amount');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}
