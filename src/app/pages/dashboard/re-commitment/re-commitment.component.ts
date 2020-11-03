import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commitment } from 'src/app/shared/models/commitment';
import { Customer } from 'src/app/shared/models/customer';
import { Income } from 'src/app/shared/models/income';
import { ReCommitmentService } from './re-commitment.service';

@Component({
  selector: 'app-re-commitment',
  templateUrl: './re-commitment.component.html',
  styleUrls: ['./re-commitment.component.css'],
})
export class ReCommitmentComponent implements OnInit {
  packages = [1000, 5000, 10000, 50000];
  reCommitmentForm: FormGroup;
  customer: Customer;
  incomeDetails: Income;
  commitment: Commitment;
  errorMessage: string;
  successMessage: string;

  constructor(private reCommitmentService: ReCommitmentService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    this.incomeDetails = JSON.parse(sessionStorage.getItem('incomeDetails'));
    this.createForm();
    this.packages = this.packages.filter((element) => {
      return element >= this.incomeDetails.commitmentAmt;
    });
  }

  createForm() {
    this.reCommitmentForm = this.fb.group({
      commitmentAmt: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this.commitment = this.reCommitmentForm.value as Commitment;
    this.commitment.customerId = this.customer.id;

    this.reCommitmentService.reCommitment(this.commitment).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

}
