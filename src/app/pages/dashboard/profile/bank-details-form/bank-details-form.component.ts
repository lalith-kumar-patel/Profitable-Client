import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginValidators } from 'src/app/shared/validators/login.validator';
import { Customer } from 'src/app/shared/models/customer';
import { Bank } from 'src/app/shared/models/bank';
import { BankDetailsFormService } from './bank-details-form.service';

@Component({
  selector: 'app-bank-details-form',
  templateUrl: './bank-details-form.component.html',
  styleUrls: ['./bank-details-form.component.css']
})
export class BankDetailsFormComponent implements OnInit {

  bankDetForm: FormGroup;
  customer: Customer;
  bank: Bank;
  errorMessage: string;
  successMessage: string;

  disableFormEdit = true;

  constructor(
    private fb: FormBuilder,
    private bankDetailsFormService: BankDetailsFormService
  ) { }

  ngOnInit(): void {
    this.bank = JSON.parse(sessionStorage.getItem('customerBankdetails'));
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    console.log(this.bank);
    console.log(this.customer);
    this.createForm();
  }

  createForm() {
    if (this.bank === null)
    {
      this.bankDetForm = this.fb.group({
        acctNumber: ['', [Validators.required], null],
        acctHolder: ['', [Validators.required], null],
        bank: ['', [Validators.required], null],
        ifsc: ['', [Validators.required], null],
        gpay: ['', Validators.required],
        phonepe: ['', Validators.required],
      });
    }
    else{
      this.bankDetForm = this.fb.group({
        acctNumber: [this.bank.acctNumber, [Validators.required], null],
        acctHolder: [this.bank.acctHolder, [Validators.required], null],
        bank: [this.bank.bank, [Validators.required], null],
        ifsc: [this.bank.ifsc, [Validators.required], null],
        gpay: [this.bank.gpay, Validators.required],
        phonepe: [this.bank.phonepe, Validators.required],
      });
    }
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this.bank = this.bankDetForm.value as Bank;
    this.bank.emailId = this.customer.emailId;
    this.customer.bank = this.bank;
    console.log(this.bank);

    this.bankDetailsFormService.updateBankDetails(this.bank).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
        sessionStorage.setItem('customer', JSON.stringify(this.customer));
        sessionStorage.setItem('customerBankdetails', JSON.stringify(this.customer.bank));
        sessionStorage.setItem('userType', JSON.stringify('Customer'));
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

}
