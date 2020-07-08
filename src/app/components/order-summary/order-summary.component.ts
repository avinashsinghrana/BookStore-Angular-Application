import { CartServiceService } from './../../services/cart-service/cart-service.service';
import { CustomerDetailsService } from './../../services/customer-Details/customer-details.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Book } from '../../model/book.model';
import { MatRadioChange } from '@angular/material';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  registerForm: FormGroup;
  cartItems: any;
  popup = false;
  press = false;
  popDown = false;
  //objectKeys=Object.keys;
  actualPrice: Number;
  books: any;
  lType: any;
  //price:books.price;
  //quantity: number;
  //totalPrice: number=1500;
  person: String;
  token: string;



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
      landMark: ['', [Validators.required]],
      locationType: new FormControl(this.person)

    })
    this.getAllBookCart()
  }

  getAllBookCart() {
    this.cartService.getBookCart().subscribe((response: any) => {
      this.books = response;
      console.log(response);

    });
  }

  onPopup() {
    this.popup = true;
    this.popDown = true;

  }



  increaseQuantity(index: any) {

    this.books[index].quantity++;
    this.cartService.addBooks(this.books[index].book_id).subscribe((response: any) => {
      console.log("response", response);
    })



    this.getAllBookCart();
    // this.quantity++;
    /*  var price=this.books[index].totalPrice;
     this.books[index].totalPrice =  this.books[index].totalprice+price; */

  }


  decreaseQuantity(index: any) {

    this.books[index].quantity--;
    //this.quantity--;
    if (this.books[index].quantity > 0) {
      this.cartService.removeItem(this.books[index].book_id).subscribe((response: any) => {
        console.log("response=", response);
      })

      this.getAllBookCart();
      //var price = this.books[index].totalPrice;
      // this.books[index].totalPrice = this.books[index].totalprice - this.priceList[index];

    }
  }

  getQuantitiy(index: any): boolean{
    if(this.books[index].quantity<2){
      return true;
    }
    
    return false;
  }


  removeAllItemsCart(index: any) {
    this.cartService.removeAllItems(this.books[index].book_id).subscribe((response: any) => {
      console.log("response", response);
    })
    this.getAllBookCart();
  }

  onPress() {
    this.token = localStorage.getItem('token');
    if (this.registerForm.valid)
      this.customerDetailsService.addDetails(this.registerForm.value, this.token).subscribe((response: any) => {
        console.log("response", response);


      }
      )
    this.press = true;

  }

  userId: Number = 1;
  checkout() {

    this.userId = 2;
    console.log(this.userId);
  }
  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.person = mrChange.value;
    console.log(this.person);

  }


}
