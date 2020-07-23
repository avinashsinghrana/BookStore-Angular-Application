import { CartServiceService } from './../../services/cart-service/cart-service.service';
import { CustomerDetailsService } from './../../services/customer-Details/customer-details.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {  Router } from '@angular/router';
import { MatRadioChange, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { MessageService } from 'src/app/services/message.service';
import { CartserviceService } from 'src/app/services/cartservice.service';


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
  afterCheckout = "Not true";
  size: any;
  sortTerm: any;
  fullName:any;
  phoneNumber: any;
  locality:  any;
  pinCode:  any;
  address:  any;
  city:  any;
  landMark:  any;
  locationType:  any;
  actualPrice: Number;
  totalPrice: number=0;

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
    private cartServices: CartserviceService,
    private router: Router,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
   // this.getAllBookCart()
      this.afterCheckout = "Not true";
      this.isEmpty = true;
      this.isAvailable = true;
    // this.cartPrice = this.books.totalPrice
   
    this.messageService.currentCart$.subscribe(message =>
      { //this.myBooks.push(message)
        console.log("ravi",message), this.isEmpty = false,this.itemQuantity = message.quantity,
      this.cartPrice = message.price,console.log("geeth",this.cartPrice),
        this.cartQuantity = 1});
  
    this.messageService.currentBooksInCart.subscribe((data) => {
      console.log("data",data);
      this.onDisplayBooks(data);
    });
  
    this.printData();
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern("^[A-Z][a-z]+\\s?[A-Z][a-z]+$")]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^[6-9][0-9]{9}$")]],
      locality: ['', [Validators.required, Validators.pattern("^[A-Z][a-z\\s]{3,}")]],
      pinCode: ['', [Validators.required,Validators.pattern("^[0-9]{6}")]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required,Validators.pattern("^[A-Z][a-z]+(?:[\s-][a-zA-Z]+)*$")]],
      landMark: ['', [Validators.required,Validators.pattern("^[A-Z][a-z\\s]{3,}")]],
      locationType: new FormControl(this.person)
    })
    
  //  this.getAllBookCart()
  }
   
  printData(){ 
    let num1: number = +sessionStorage.getItem('cartsize');
    let num2: number = +sessionStorage.getItem('size');
    this.size = num1 + num2;
    console.log('num1 ',num1);
    console.log('num2 ',num2);
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      console.log("key",key);
      console.log("key 0",key[0]);
      if(key[0]=='c'){
      console.log("value",JSON.parse(localStorage.getItem(key)));
      this.books.push(JSON.parse(localStorage.getItem(key)));
      }
     // this.value[localStorage.getItem(key)] = sessionStorage.getItem(key);
    }
  }

 /* getAllBookCart() {
    this.cartService.getBookCart().subscribe((response: any) => {
      this.books = response;
      this.size = response.length;
      console.log("getallbook",response);

    });
  }*/
  onShoping(){
    this.router.navigate(['user-dashboard']);
  }
  onDisplayBooks(data) {
   // console.log(data);
   // this.books = data;
   // this.size = data.length;
    //  this.size = data.length;
      data.forEach((bookData) => {
        localStorage.setItem('c'+bookData.bookId, JSON.stringify(bookData));
        sessionStorage.setItem(bookData.bookId, bookData.bookId);
        
      }); 
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
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if(key[0]=='c'){
        var obj = JSON.parse(localStorage.getItem(key));
        this.totalPrice = this.totalPrice + +obj.totalPrice;
        console.log(this.totalPrice); 
        console.log(obj); 
        this.cartServices.addToBag(obj,key[1]).subscribe((message) => {
        });
      }
    }
    // this.customerDetailsService.getUserDetails().subscribe((response: any) => {
    //   this.fullName = response.userDetailList[0].fullName;
    //   this.phoneNumber = response.userDetailList[0].phoneNumber;
    //   this.locality= response.userDetailList[0].locality;
    //   console.log(response);
  // pinCode:  any;
  // address:  any;
  // city:  any;
  // landMark:  any;
  // locationType:  any;
    // })
  }

  onQuantity(book: any ,event: any){
   
      if(event.data>=book.maxQuantity){
        this.isAvailable = false;
      }
    console.log("index",book.book_id);
    console.log("event",event.data);
    this.cartService.addIteams(book.book_id, event.data).subscribe((response: any) => {
      // this.size = response.length;

    //  this.cartService.getBookCart();
    // this.messageService.changeCartBook();
      
      // window.location.reload();
      // console.log("response", response);
    })


  }


  increaseQuantity(book: any) { 
   // let fixPrice =  book.totalPrice/;   
      book.quantity++;
      book.totalPrice =  (book.totalPrice/(book.quantity-1))*book.quantity;
      localStorage.setItem('c'+book.bookId, JSON.stringify(book));
      this.books = [];
      this.printData();
 /*   this.cartService.addBooks(bookId).subscribe((response: any) => {
      this.cartQuantity = response.data.quantity;
      this.cartPrice = response.data.totalPrice;
     this.messageService.changeCartBook();
      // window.location.reload();
      // console.log("response", response);
    })
*/


   // this.getAllBookCart();
    // this.quantity++;
    /*  var price=this.books[index].totalPrice;
     this.books[index].totalPrice =  this.books[index].totalprice+price; */

  }


  decreaseQuantity(book: any) {
    book.quantity--;
    book.totalPrice =  (book.totalPrice/(book.quantity+1))*book.quantity;
    localStorage.setItem('c'+book.bookId, JSON.stringify(book));
    this.books = [];
    this.printData();
    /*console.log("id", bookId);
      this.cartService.removeItem(bookId).subscribe((response: any) => {
        this.cartQuantity = response.data.quantity;
        this.cartPrice = response.data.totalPrice;
        this.cartService.getBookCart();
        this.messageService.changeCartBook();
        console.log("response=", response);
      }) */
  }

  getQuantitiy(bookId: any): boolean{
    if(this.cartQuantity<1){
      return true;
    }
    return false;
  }


  removeAllItemsCart(bookId: any) {
    console.log("ccc",bookId)
    localStorage.removeItem('c'+bookId);
    sessionStorage.removeItem(bookId);
    let num1: number = +sessionStorage.getItem('cartsize');
    let num2: number = +sessionStorage.getItem('size');
     let size1: number =  num2;
     size1--;
     if(size1>=0){
       sessionStorage.setItem('size', JSON.stringify(size1));
     }
   /*  if(size1==0){
      location.reload();
      }*/
   // this.messageService.changeCartBook();
   if(localStorage.getItem('token')!=null && num1!=0 ){
    this.cartService.removeBookById(bookId).subscribe((response: any) => {
      this.messageService.changeCartBook();
      location.reload();
     // num1--;
     // sessionStorage.setItem('cartsize',JSON.stringify(num1));
     // this.books = [];
     // this.printData();
    /* sessionStorage.removeItem(bookId);
     let size: any =  sessionStorage.getItem('size');
     size--;
     if(size>=0){
     sessionStorage.setItem('size', size);
     }
      console.log("Book id",bookId);
      console.log("response", response);*/
      
    })
   // this.messageService.changeCartBook();
  }
  this.books = [];
  this.printData();
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
    this.cartService.sendMail().subscribe((response: any) => {
     sessionStorage.setItem("orderId", response.data);
   })
   let token = localStorage.getItem('token');
   let emailId = localStorage.getItem('email');
   let name = localStorage.getItem('name');
   let image = localStorage.getItem(emailId);
    this.cartService.removeAll().subscribe((response: any) => {
      localStorage.clear();
      localStorage.setItem('token', token);
      localStorage.setItem('email', emailId);
      localStorage.setItem('name', name);
      localStorage.setItem('image', image);
      //  console.log("response", response);
      //  sessionStorage.clear();
      //  this.afterCheckout = "true";
      //  localStorage.setItem("checkout status", this.afterCheckout);
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
