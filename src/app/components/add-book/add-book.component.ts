import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators, PatternValidator} from '@angular/forms';
import {SellerService} from '../../services/seller.service';
import {MatSnackBar, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MessageService} from '../../services/message.service';
import {Book} from 'src/app/models/book.model';
import {formatDate} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  file: any;
  isProfile = 'false';
  bookImageUrl: any;
  response: any;
  imgFile: File;
  result: string;
  book = {
    bookName: null,
    authorName: null,
    price: null,
    quantity: null,
    bookDetails: null,
    bookImgUrl: null,
  };

  constructor(
    private vendorService: SellerService,
    public snackbar: MatSnackBar,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {
  }

  bookForm = new FormGroup({
    bookName: new FormControl('', [Validators.required,]),
    authorName: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.min(1), Validators.required]),
    quantity: new FormControl('', [Validators.min(1), Validators.required]),
    description: new FormControl('', Validators.required),
    imageURL: new FormControl(this.bookImageUrl, Validators.required),
  });

  ngOnInit() {
  }

  onUploadBookImage(event) {
    this.result = 'Uploading..';
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.file);
      this.file.inProgress = true;

      this.userService.bookPic(formData).subscribe((data: any) => {
        this.bookImageUrl = data.data;
        console.log(data);
        console.log(this.bookImageUrl);
        this.result = 'Uploaded';
      });
    }
  }

  onFormSubmit() {
    this.dialogRef.close();
    this.book.bookName = this.bookForm.value.bookName;
    this.book.authorName = this.bookForm.value.authorName;
    this.book.price = this.bookForm.value.price;
    this.book.quantity = this.bookForm.value.quantity;
    this.book.bookDetails = this.bookForm.value.description;
    this.book.bookImgUrl = this.bookImageUrl;
    console.log('book data ', this.book);
    this.vendorService.addBook(this.book).subscribe(
      (data) => {
        console.log('book data response ', data);
        // if (data.status === 200) {
        this.messageService.changeOnNewlyAdded();
        /*  this.snackBar.open(data.message, 'ok', {
            duration: 2000,
          });*/
        // }
      },
      (error) => {
        this.snackBar.open(error.message, 'cancel', {
          duration: 6000,
        });
      }
    );
  }
}
