import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MessageService} from 'src/app/services/message.service';

@Component({
  selector: 'app-bookRejection',
  templateUrl: './bookRejection.component.html',
  styleUrls: ['./bookRejection.component.scss'],
})
export class BookRejectionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BookRejectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService
  ) {
  }

  status: String = 'No Reason';

  ngOnInit(): void {
    // console.log(this.data['status']);
    this.status = localStorage.getItem('reason');
    console.log(this.status);
  }

  onVerify() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
