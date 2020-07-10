import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SellerService } from "../../services/seller.service";
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MessageService } from "../../services/message.service";
import { Book } from 'src/app/model/book.model';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
})
export class UpdateBookComponent implements OnInit {
  response: any;
  book = {
    bookName: null,
    authorName: null,
    price: null,
    quantity: null,
    bookDetails: null,
  };
  constructor(
    private vendorService: SellerService,
    public snackbar: MatSnackBar,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  bookForm = new FormGroup({
    bookName: new FormControl(''),
    authorName: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
  });
  ngOnInit() {}
  validate(){
    if( this.bookForm.value.bookName != '' || this.bookForm.value.authorName != '' || this.bookForm.value.price
         != '' || this.bookForm.value.quantity != '' || this.bookForm.value.description != ''){
      return "false";
    }
    return "true";
  }
  onFormSubmit() {
    this.dialogRef.close();
    if(this.bookForm.value.bookName==''){
      this.book.bookName = this.data.bookName;
    }else{
      this.book.bookName = this.bookForm.value.bookName;
    }
    if(this.bookForm.value.authorName == ''){
      this.book.authorName = this.data.authorName;
    }else{
      this.book.authorName = this.bookForm.value.authorName;
    }
    if(this.bookForm.value.price==''){
      this.book.price = this.data.price
    }else{
      this.book.price = this.bookForm.value.price;
    }
    if(this.bookForm.value.quantity==''){
      this.book.quantity = this.data.quantity;
    }else{
      this.book.quantity = this.bookForm.value.quantity;
    }
    if(this.bookForm.value.description==''){
      this.book.bookDetails = this.data.bookDetails;
    }else{
      this.book.bookDetails = this.bookForm.value.description;
    }  
    console.log("book data ",this.book);
    this.vendorService.updateBook(this.book,this.data.bookId).subscribe(
      (data) => {
          console.log("book data response ",data);
          this.messageService.changeMessage();
      },
      (error) => {
        this.snackBar.open("Failed to update", 'cancel', {
          duration: 3000,
        });
      }
    );
}
}
