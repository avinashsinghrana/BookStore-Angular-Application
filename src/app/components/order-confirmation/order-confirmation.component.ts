import { Component, OnInit } from '@angular/core';
import {OrderconfirmationService} from "../../services/orderConfirmation/orderconfirmation.service";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  // orderId: number = 123456;
  constructor(private ordercinfirmation : OrderconfirmationService) { }

  ngOnInit(): void {
    // this.fetchOrderId();
  }
  fetchOrderId(){
   // order_id: number
   let orderId = sessionStorage.getItem("orderId");
   sessionStorage.clear();
    return '#'+orderId;
  }
  getOrderId(){
    //   this.ordercinfirmation.fetchOrderId().subscribe((response:any) => {
    //     this.orderId = response;
    //     console.log("id", response)
    //  });
    
  }
}
