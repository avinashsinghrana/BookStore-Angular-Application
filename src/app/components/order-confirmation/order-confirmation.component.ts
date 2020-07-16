import { Component, OnInit } from '@angular/core';
import {OrderconfirmationService} from "../../services/orderConfirmation/orderconfirmation.service";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  orderId: number = 123456;
  constructor(private ordercinfirmation : OrderconfirmationService) { }

  ngOnInit(): void {
    this.getOrderId();
  }
  fetchOrderId(){
   // order_id: number
    return '#'+this.orderId;
  }
  getOrderId(){
      this.ordercinfirmation.fetchOrderId().subscribe((response:any) => {
        this.orderId = response;
     });
  }
}
