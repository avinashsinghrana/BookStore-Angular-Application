import { CartServiceService } from './../../services/cart-service/cart-service.service';
import { CustomerDetailsService } from './../../services/customer-Details/customer-details.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
 import{ Book } from '../../model/book.model'; 

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  registerForm: FormGroup;
  cartItems: any;
popup=false;
press= false;
popDown=false;
price: number=1500;

quantity: number=1;
  totalPrice: number=1500;



  constructor(public formBuilder: FormBuilder,
    private customerDetailsService: CustomerDetailsService,
    private cartService: CartServiceService
  ) {

   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
       phoneNumber: ['', [Validators.required]], 
       locality: ['', [Validators.required]],
       pinCode: ['', [Validators.required]], 
       address: ['', [Validators.required]],
       city: ['', [Validators.required]],
       landMark: ['', [Validators.required]]
 
 
     })
   } 
/* 
   getAllBookCart() {     
     this.cartservice.getBookCart().subscribe((response: any) => {      
              
         this.cartItems = response ; 
         console.log(response);
                     });
                    } */

  onPopup() {
    this.popup = true;
    this.popDown=true;

  }
  

  increaseQuantity(){
     this.cartService.addBooks(1).subscribe((response: any) => {
      console.log("response",response);
     }) 
     
    this.quantity++;
    this.totalPrice=this.totalPrice+this.price;
  }

  decreaseQuantity(){
    this.quantity--;
    if(this.quantity>0){
      this.cartService.removeItem(1).subscribe((response: any) => {
        console.log("response=",response);
       }) 
    this.totalPrice=this.totalPrice-this.price;
    }
  }

  getQuantitiy(){
    return this.quantity;
  }


  removeAllItemsCart(){
    this.cartService.removeAllItems().subscribe((response: any) => {
      console.log("response",response);
     }) 
  }

 onPress() {
  if (this.registerForm.valid)
  this.customerDetailsService.addDetails(this.registerForm.value).subscribe((response: any) => {
    console.log("response",response);
    
  } 
  )
  this.press = true;
}

 userId: Number=1;
checkout(){

  this.userId=2;
  console.log(this.userId);
}
}
