import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OtpSystem } from 'src/app/shared/models/otpSystem';
import { OtpDialogService } from './otp-dialog.service';

export interface OtpData {
  phoneNumber: any;
  status: string;
}

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css']
})
export class OtpDialogComponent implements OnInit {
  errorMessage: any;
  successMessage: any;
  otpSystem: OtpSystem;

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<OtpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OtpData,
    private otpDialogService: OtpDialogService) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(data) {
    this.errorMessage = null;
    this.successMessage = null;
    this.otpSystem = { phoneNumber : this.data.phoneNumber, otp : data};

    this.otpDialogService.verifyOTP(this.otpSystem).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
        this.dialogRef.close('success');
      }, error => {
        this.errorMessage = (error as any);
        console.log(this.errorMessage);
      }
    );
  }

  onResendOtp() {
    this.errorMessage = null;
    this.successMessage = null;
    this.otpSystem = { phoneNumber : this.data.phoneNumber};

    this.otpDialogService.sendOTP(this.otpSystem).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

}
