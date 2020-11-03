import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bank } from 'src/app/shared/models/bank';
import { Staff } from 'src/app/shared/models/staff';
import { BankDetailsService } from './bank-details.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  bankDetForm: FormGroup;
  staff: Staff;
  bank: Bank;
  errorMessage: string;
  successMessage: string;

  disableFormEdit = true;

  constructor(
    private fb: FormBuilder,
    private bankDetailsService: BankDetailsService
  ) { }

  ngOnInit(): void {
    this.bank = JSON.parse(sessionStorage.getItem('staffBankdetails'));
    this.staff = JSON.parse(sessionStorage.getItem('staff'));
    console.log(this.bank);
    console.log(this.staff);
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
    this.bank.emailId = this.staff.emailId;
    this.staff.bank = this.bank;
    console.log(this.bank);

    this.bankDetailsService.updateBankDetails(this.bank).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
        sessionStorage.setItem('staff', JSON.stringify(this.staff));
        sessionStorage.setItem('staffBankdetails', JSON.stringify(this.staff.bank));
        sessionStorage.setItem('userType', JSON.stringify('Staff'));
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }
}
