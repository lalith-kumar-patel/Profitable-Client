import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/shared/models/customer';
import { Getter } from 'src/app/shared/models/getter';
import { WithdrawEngine } from '../withdraw_engine';
import { PrincipalService } from './principal.service';

// Principal withdraw Enter amount form remove

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  customer: Customer;
  getter: Getter;
  errorMessage: string;
  successMessage: string;
  incomeDetails: any;
  withdrawDisable: boolean;

  constructor(
    private principalService: PrincipalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    this.incomeDetails = JSON.parse(sessionStorage.getItem('incomeDetails'));
    this.withdrawDisable = WithdrawEngine.growthAndPrincipalWorkingHours(new Date());
    if (this.withdrawDisable) {
      this.toastr.warning('Can\'t withdraw principal today', 'Message', {
        closeButton: true
      });
    }
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this.getter = { getterId : this.customer.id, getterName : this.customer.name, getterAmt : this.incomeDetails.lastCommitmentAmt };
    console.log(this.getter);

    this.principalService.withdrawPrincipal(this.getter).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

}
