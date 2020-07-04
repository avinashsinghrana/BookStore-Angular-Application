import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  orderId: number = 123456;
  constructor() { }

  ngOnInit(): void {
  }
  fetchOrderId(order_id: number){
    this.orderId = order_id;
  }
  getOrderId(): String{
      return '#'+this.orderId;
  }
}
