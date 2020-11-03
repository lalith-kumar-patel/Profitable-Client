import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/shared/models/customer';
import { Getter } from 'src/app/shared/models/getter';
import { WithdrawEngine } from '../withdraw_engine';
import { GrowthBonusService } from './growth-bonus.service';

@Component({
  selector: 'app-growth-bonus',
  templateUrl: './growth-bonus.component.html',
  styleUrls: ['./growth-bonus.component.css']
})
export class GrowthBonusComponent implements OnInit {
  growthForm: FormGroup;
  customer: Customer;
  getter: Getter;
  errorMessage: string;
  successMessage: string;
  incomeDetails: any;
  withdrawDisable: boolean;
  invalidInput = true;

  constructor(
    private fb: FormBuilder,
    private growthBonusService: GrowthBonusService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    this.incomeDetails = JSON.parse(sessionStorage.getItem('incomeDetails'));
    this.createForm();
    this.withdrawDisable = WithdrawEngine.growthAndPrincipalWorkingHours(new Date());
    if (this.withdrawDisable) {
      this.toastr.warning('Can\'t withdraw growth bonus today', 'Message', {
        closeButton: true
      });
    }
  }

  createForm() {
    this.growthForm = this.fb.group({
      getterAmt: ['', Validators.required]
    });
  }

  validateInputAmount(event: any) {
    if (event.target.value > this.incomeDetails.growthIncome) { this.invalidInput = true; }
    else { this.invalidInput = false; }
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this.getter = this.growthForm.value as Getter;
    this.getter.getterId = this.customer.id;
    this.getter.getterName = this.customer.name;
    console.log(this.getter);

    this.growthBonusService.withdrawGrowth(this.getter).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

}
