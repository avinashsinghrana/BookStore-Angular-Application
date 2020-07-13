import { CartServiceService } from './../../services/cart-service/cart-service.service';
import { CustomerDetailsService } from './../../services/customer-Details/customer-details.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { MatRadioChange, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';


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
  size: any;
  sortTerm: any;
  actualPrice: Number;
  books: any;
  person: String;
  token: string;

  constructor(public formBuilder: FormBuilder,
    private dialog: MatDialog,
    private customerDetailsService: CustomerDetailsService,
    private cartService: CartServiceService,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern("^[A-Z][a-z]+\\s?[A-Z][a-z]+$")]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^[6-9][0-9]{9}$")]],
      locality: ['', [Validators.required]],
      pinCode: ['', [Validators.required,Validators.pattern("^[0-9]{6}")]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required,Validators.pattern("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$")]],
      landMark: ['', [Validators.required]],
      locationType: new FormControl(this.person)
    })
    this.getAllBookCart()
  }

  getAllBookCart() {
    this.cartService.getBookCart().subscribe((response: any) => {
      this.books = response;
      this.size = response.length;
      console.log(response);

    });
  }

  onPopup() {
    if(localStorage.getItem("token")== null){
      this.dialog.open(LoginComponent, {
        width: '28%',
        height : 'auto'
      });
    }
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
     // window.location.reload();
     let size: any =  sessionStorage.getItem('size');
     size--;
     sessionStorage.setItem('size', size);
     this.getAllBookCart();
      console.log("Book id",this.books[index].book_id);
      console.log("response", response);
    })
   // this.getAllBookCart();
  }

  onPress() {
    console.log("data1", this.registerForm.value);
    this.token = localStorage.getItem('token');
    if (this.registerForm.valid)
      this.customerDetailsService.addDetails(this.registerForm.value, this.token).subscribe((response: any) => {
        console.log("data", this.registerForm.value);
        console.log("response", response);
      }
      )
    this.press = true;

  }

  userId: Number = 1;
  checkout() {
    this.userId = 2;
    console.log(this.userId);
    this.cartService.removeAll().subscribe((response: any) => {
       console.log("response", response);
       sessionStorage.clear();
       this.getAllBookCart();
       this.router.navigate(['/order-confirmation']);
    })
  }
  // onChange(mrChange: MatRadioChange) {
  //   console.log(mrChange.value);
  //   this.person = mrChange.value;
  //   console.log(this.person);

  // }
  onChange(val: any){
    this.sortTerm = val;
    this.person = this.sortTerm;
    console.log("sorting term",this.sortTerm);
   }
}
