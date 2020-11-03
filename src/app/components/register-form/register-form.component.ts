import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterFormService } from './register-form.service';
import { Customer } from 'src/app/shared/models/customer';
import { LoginValidators } from 'src/app/shared/validators/login.validator';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { OtpSystem } from 'src/app/shared/models/otpSystem';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  packages = [1000, 5000, 10000, 50000];
  selectedPackage: number;
  customer: Customer;
  registerUserForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  genders = ['Male', 'Female', 'Others', 'Not Disclosed'];
  hide = true;
  referralId = 0;
  otp: number;
  otpSystem: OtpSystem;

  constructor(
    private fb: FormBuilder,
    private registerFormService: RegisterFormService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.referralId = +params[ 'referralId' ] || 10000; });
    this.customer = new Customer();
    this.createForm();
  }

  openOTPDialog(phoneNumber: any) {
    const dialogRef = this.dialog.open(OtpDialogComponent, {
      width: '500px',
      data: { phoneNumber }
    }).afterClosed().subscribe((data: any) => {
      if ( data === 'success'){
        this.registerUser();
      }
    });
  }

  createForm() {
    this.registerUserForm = this.fb.group({
      emailId: ['', [Validators.required, LoginValidators.validateEmailId], null],
      fname: ['', [Validators.required, LoginValidators.validateName], null],
      lname: ['', [Validators.required, LoginValidators.validateName], null],
      phoneNumber: ['', [Validators.required, LoginValidators.validatePhoneNumber], null],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      sponsorId: [this.referralId, Validators.required],
      packageAmt: ['', Validators.required],
      password: ['', [Validators.required, LoginValidators.validatePassword], null],
      confirmNewPassword: ['', [Validators.required], null]
    });

    this.registerUserForm.get('confirmNewPassword').setValidators([
      Validators.required,
      LoginValidators.confirmPassword(this.registerUserForm.get('password'))
    ]);
  }

  registerUser() {
    this.errorMessage = null;
    this.successMessage = null;
    this.customer = this.registerUserForm.value as Customer;
    this.customer.name = this.registerUserForm.value.fname + ' ' + this.registerUserForm.value.lname;
    console.log(this.customer);

    this.registerFormService.registerCustomer(this.customer)
    .subscribe((response) => {
        console.log(response);
        this.successMessage = response;
        this.registerUserForm.reset();
      },
      error => this.errorMessage = (error as any)
    );
  }

  sendOtp(){
    this.errorMessage = null;
    this.successMessage = null;
    this.customer = this.registerUserForm.value as Customer;
    console.log(this.customer.phoneNumber);
    this.otpSystem = { phoneNumber : this.customer.phoneNumber};

    this.registerFormService.sendOTP(this.otpSystem).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
        this.openOTPDialog(this.customer.phoneNumber);

        console.log('dffd');
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

}
