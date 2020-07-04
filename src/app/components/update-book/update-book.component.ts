import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from 'src/app/models/book.model';
import { MessageService } from "../../services/message.service";
import { SellerService } from "../../services/seller.service";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
})
export class UpdateBookComponent implements OnInit {
  book: any;
  constructor(
    private vendorService: SellerService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}
  updateBookForm = new FormGroup({
    price: new FormControl('', [Validators.min(1), Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });

  ngOnInit() {}
  onFormSubmit() {
    this.dialogRef.close();
    this.vendorService
      .updateBook(this.updateBookForm.value, this.data)
      .subscribe((data) => {
        this.messageService.changeMessage();
      });
  }
}
