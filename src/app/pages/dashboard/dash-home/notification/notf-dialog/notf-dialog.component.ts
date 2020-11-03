import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  getterId: number;
  getterName: string;
  getterGPAY: string;
  transactionID?: string;
}

@Component({
  selector: 'app-notf-dialog',
  templateUrl: './notf-dialog.component.html',
  styleUrls: ['./notf-dialog.component.css'],
})
export class NotfDialogComponent implements OnInit {
  transactionID: string = null;
  flag = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<NotfDialogComponent>
  ) { }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

}

