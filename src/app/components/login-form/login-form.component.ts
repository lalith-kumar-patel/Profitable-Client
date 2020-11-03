import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/models/customer';
import { LoginFormService } from './login-form.service';
import { LoginValidators } from 'src/app/shared/validators/login.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  customer: Customer;
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  tryToLogin = false;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private loginFormService: LoginFormService,
    private router: Router
  ) { }

  ngOnInit() {
    this.customer = new Customer();
    this.createForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createForm() {
    this.loginForm = this.fb.group({
      emailId: [this.customer.emailId, [Validators.required, LoginValidators.validateEmailId], null],
      password: [this.customer.password, [Validators.required, LoginValidators.validatePassword], null]
    });
  }

  login() {
    this.errorMessage = null;
    this.successMessage = null;
    this.tryToLogin = true;
    this.customer = this.loginForm.value as Customer;

    this.loginFormService.login(this.customer).subscribe(
      (response) => {
        console.log(response);
        this.customer = response;
        this.tryToLogin = true;
        sessionStorage.setItem('customer', JSON.stringify(this.customer));
        sessionStorage.setItem('customerBankdetails', JSON.stringify(this.customer.bank));
        sessionStorage.setItem('userType', JSON.stringify('Customer'));
        setTimeout(_ => this.tryToLogin = false, 700);
        this.router.navigate(['/dashboard']);
        setTimeout(_ => this.onClose(), 500);
      }, error => {
        this.tryToLogin = false;
        this.errorMessage = (error as any);
      }
    );
  }

  onClose(){
    this.dialogRef.close();
  }
}
