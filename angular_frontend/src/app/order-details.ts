import { DeliveryAddress } from "./delivery-address";
import { CartItems } from "./cart-items";
export class OrderDetails {
    email:string;
    mobileno:string;
    deliveryAddress:DeliveryAddress;
    cartDetails:CartItems[];
    paymentStatus:boolean;
}
