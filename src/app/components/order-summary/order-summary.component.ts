import { CartServiceService } from './../../services/cart-service/cart-service.service';
import { CustomerDetailsService } from './../../services/customer-Details/customer-details.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { MatRadioChange, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { MessageService } from 'src/app/services/message.service';
import { AddBookComponent } from '../add-book/add-book.component';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  books = [];
  myBooks = [];
  registerForm: FormGroup;
  cartItems: any;
  show = false;
  order = false;
  popup = false;
  press = false;
  popDown = false;
  size: any;
  sortTerm: any;
  actualPrice: Number;
 // books: any;
  person: String;
  token: string;
  cartQuantity: any;
  cartPrice: any;
  itemQuantity: any;
  isEmpty: any;
  isAvailable: any;
  constructor(public formBuilder: FormBuilder,
    private dialog: MatDialog,
    private customerDetailsService: CustomerDetailsService,
    private cartService: CartServiceService,
    private router: Router,
    private messageService: MessageService,
  ) {


  }

  ngOnInit() {
   // this.getAllBookCart()
    
      this.isEmpty = true;
      this.isAvailable = true;
    // this.cartPrice = this.books.totalPrice
    this.messageService.currentCart$.subscribe(message =>
      { //this.myBooks.push(message)
        console.log("ravi",message), this.isEmpty = false,this.itemQuantity = message.quantity,
      this.cartPrice = message.price,console.log("geeth",this.cartPrice),
        this.cartQuantity = 1});
        
    this.messageService.changeCartBook();
    this.messageService.currentBooksInCart.subscribe((data) => {
      console.log("data",data);
      this.onDisplayBooks(data);
    });
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern("^[A-Z][a-z]+\\s?[A-Z][a-z]+$")]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^[6-9][0-9]{9}$")]],
      locality: ['', [Validators.required, Validators.minLength(3)]],
      pinCode: ['', [Validators.required,Validators.pattern("^[0-9]{6}")]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required,Validators.pattern("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$")]],
      landMark: ['', [Validators.required,Validators.minLength(3)]],
      locationType: new FormControl(this.person)
    })
    
  //  this.getAllBookCart()
  }

 /* getAllBookCart() {
    this.cartService.getBookCart().subscribe((response: any) => {
      this.books = response;
      this.size = response.length;
      console.log("getallbook",response);

    });
  }*/
  onDisplayBooks(data) {
    console.log(data);
    this.books = data;
    this.size = data.length;
  /*  if (data.status === 200) {
      this.size = data.length;
      data.forEach((bookData) => {
      this.books.push(bookData);
        
      });*/
   // }
  }


  onPopup() {
    if (this.size >= 1){
      if(localStorage.getItem("token")== null){
        this.dialog.open(LoginComponent, {
          width: '28%',
          height : 'auto'
        });
      }
      this.popup = true;
      this.popDown = true;
    }
    this.show = true;
  }

  onQuantity(bookId: any ,event: any){
    this.myBooks.forEach((bookData) => {
      console.log('book data ',bookData);
      if(bookData.bookId==bookId && event.data>=bookData.quantity){
        this.isAvailable = false;
      }})
    console.log("index",bookId);
    console.log("event",event.data);
    this.cartService.addIteams(bookId, event.data).subscribe((response: any) => {
      // this.size = response.length;

    //  this.cartService.getBookCart();
     this.messageService.changeCartBook();
      
      // window.location.reload();
      // console.log("response", response);
    })


  }


  increaseQuantity(bookId: any) {

    // this.books[index].quantity++;
    this.cartService.addBooks(bookId).subscribe((response: any) => {
      this.cartQuantity = response.data.quantity;
      this.cartPrice = response.data.totalPrice;
     this.messageService.changeCartBook();
      // window.location.reload();
      // console.log("response", response);
    })



   // this.getAllBookCart();
    // this.quantity++;
    /*  var price=this.books[index].totalPrice;
     this.books[index].totalPrice =  this.books[index].totalprice+price; */

  }


  decreaseQuantity(bookId: any) {

    
    console.log("id", bookId);
    
      this.cartService.removeItem(bookId).subscribe((response: any) => {
        this.cartQuantity = response.data.quantity;
        this.cartPrice = response.data.totalPrice;
        this.cartService.getBookCart();
        this.messageService.changeCartBook();
        console.log("response=", response);
      })

    
  }

  getQuantitiy(bookId: any): boolean{
    if(this.cartQuantity<1){
      return true;
    }
    
    return false;
  }


  removeAllItemsCart(bookId: any) {
    this.messageService.changeCartBook();
    this.cartService.removeBookById(bookId).subscribe((response: any) => {
     window.location.reload();
     sessionStorage.removeItem(bookId);
     let size: any =  sessionStorage.getItem('size');
     size--;
     if(size>=0){
     sessionStorage.setItem('size', size);
     }
      console.log("Book id",bookId);
      console.log("response", response);
      
    })
    this.messageService.changeCartBook();
  }

  onPress() {
    console.log("data1", this.registerForm.value);
    this.token = localStorage.getItem('token');
    if (this.registerForm.valid){ 
      this.customerDetailsService.addDetails(this.registerForm.value, this.token).subscribe((response: any) => {
        console.log("data", this.registerForm.value);
        console.log("response", response);
      }
      )
    this.press = true;
    }
    this.order = true;
  }

  userId: Number = 1;
  checkout() {
    this.userId = 2;
    console.log(this.userId);
    this.cartService.removeAll().subscribe((response: any) => {
       console.log("response", response);
       sessionStorage.clear();
     //  this.getAllBookCart();
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
