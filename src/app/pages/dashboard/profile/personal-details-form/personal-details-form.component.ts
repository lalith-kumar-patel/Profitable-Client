import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Customer } from 'src/app/shared/models/customer';
import { LoginValidators } from 'src/app/shared/validators/login.validator';
import { PersonalDetailsFormService } from './personal-details-form.service';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.css']
})
export class PersonalDetailsFormComponent implements OnInit {

  personalDetForm: FormGroup;
  changeDetForm: FormGroup;
  customer: Customer;
  email: any;
  errorMessage: string;
  successMessage: string;
  genders = ['Male', 'Female', 'Others', 'Not Disclosed'];
  selectedGender: string;

  disableFormEdit = true;
  changePassword = false;
  hide = true;
  d: any;

  constructor(
    private fb: FormBuilder,
    private personalDetailsFormService: PersonalDetailsFormService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.customer = new Customer();
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    console.log(this.customer);
    this.email = this.customer.emailId;
    this.selectedGender = this.customer.gender;
    this.d = this.datepipe.transform(this.customer.dob, 'dd/MM/yyyy');
    this.createForm();
    this.createchangeForm();
  }

  createForm() {
    this.personalDetForm = this.fb.group({
      emailId: [this.customer.emailId, [Validators.required, LoginValidators.validateEmailId], null],
      fname: [this.customer.fname, [Validators.required, LoginValidators.validateName], null],
      lname: [this.customer.lname, [Validators.required, LoginValidators.validateName], null],
      phoneNumber: [this.customer.phoneNumber, [Validators.required, LoginValidators.validatePhoneNumber], null],
      dob: [this.d, Validators.required],
      gender: [this.customer.gender, Validators.required]
    });
  }

  createchangeForm() {
    this.changeDetForm = this.fb.group({
      password: ['', [Validators.required, LoginValidators.validatePassword], null],
      newPassword: ['', [Validators.required, LoginValidators.validatePassword], null],
      confirmNewPassword: ['', [Validators.required, LoginValidators.validatePassword], null]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this.customer = this.personalDetForm.value as Customer;
    this.customer.name = this.personalDetForm.value.fname + ' ' + this.personalDetForm.value.lname;
    console.log(this.customer);

    this.personalDetailsFormService.updateCustomerDetails(this.customer).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
        sessionStorage.setItem('customer', JSON.stringify(this.customer));
        sessionStorage.setItem('userType', JSON.stringify('Customer'));
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

  onSubmitchange() {
    this.errorMessage = null;
    this.successMessage = null;
    this.customer = this.changeDetForm.value as Customer;
    this.customer.emailId = this.email;
    console.log(this.customer);

    this.personalDetailsFormService.changePassword(this.customer).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
        this.changePassword = false;
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

}
