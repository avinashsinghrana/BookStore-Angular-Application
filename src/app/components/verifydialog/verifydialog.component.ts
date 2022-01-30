import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import {SellerService} from 'src/app/services/seller.service';
import {MessageService} from 'src/app/services/message.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-verifydialog',
  templateUrl: './verifydialog.component.html',
  styleUrls: ['./verifydialog.component.scss'],
})
export class VerifydialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VerifydialogComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private vendorService: SellerService,
    private router: Router
  ) {
  }

  // reasonForm = new FormGroup({
  //   reason: new FormControl('', [Validators.required,]),
  // });
  book: any;
  status: any;
  statuss: String = 'DisApprove';

  ngOnInit(): void {
    console.log(this.data['status']);
    this.status = this.data['status'];
    console.log(this.status);
  }

  onVerify() {
    if (this.status == 'DisApprove') {
      this.vendorService.ondisapprove(this.data.bookId).subscribe(
        (data) => {
          this.messageService.changeBooks();
          this.ngOnInit();
          this.snackbar.open('Book disapproved successfully', 'ok', {
            duration: 2000,
          });
          this.dialogRef.close();
        },
        (error: any) => {
          this.snackbar.open('Failed to disapproved book', 'ok', {
            duration: 2000,
          });
        }
      );
    } else {
      this.vendorService.onApprove(this.data.bookId).subscribe(
        (data) => {
          if (data.status === 200) {
            this.messageService.changeBooks();
            this.ngOnInit();
            this.snackbar.open('Book approved successfully', 'ok', {
              duration: 2000,
            });
            this.dialogRef.close();
          }
        },
        (error) => {
          this.snackbar.open('Failed to Approved', 'ok', {
            duration: 2000,
          });
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
