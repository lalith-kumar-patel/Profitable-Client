import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Staff } from 'src/app/shared/models/staff';
import { LoginValidators } from 'src/app/shared/validators/login.validator';
import { PersonalDetailsService } from './personal-details.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  personalDetForm: FormGroup;
  changeDetForm: FormGroup;
  staff: Staff;
  email: any;
  errorMessage: string;
  successMessage: string;

  hide = true;
  changePassword = false;
  disableFormEdit = true;

  constructor(
    private fb: FormBuilder,
    private personalDetailsService: PersonalDetailsService
    ) { }

  ngOnInit(): void {
    this.staff = new Staff();
    this.staff = JSON.parse(sessionStorage.getItem('staff'));
    this.email = this.staff.emailId;
    console.log(this.staff);
    this.createForm();
    this.createchangeForm();
  }

  createForm() {
    this.personalDetForm = this.fb.group({
      emailId: [this.staff.emailId, [Validators.required, LoginValidators.validateEmailId], null],
      fname: [this.staff.fname, [Validators.required, LoginValidators.validateName], null],
      lname: [this.staff.lname, [Validators.required, LoginValidators.validateName], null],
      phoneNumber: [this.staff.phoneNumber, [Validators.required, LoginValidators.validatePhoneNumber], null]
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
    this.staff = this.personalDetForm.value as Staff;
    this.staff.name = this.personalDetForm.value.fname + ' ' + this.personalDetForm.value.lname;
    console.log(this.staff);

    this.personalDetailsService.updateStaffDetails(this.staff).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
        sessionStorage.setItem('staff', JSON.stringify(this.staff));
        sessionStorage.setItem('userType', JSON.stringify('Staff'));
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

  onSubmitchange() {
    this.errorMessage = null;
    this.successMessage = null;
    this.staff = this.changeDetForm.value as Staff;
    this.staff.emailId = this.email;
    console.log(this.staff);

    this.personalDetailsService.changePassword(this.staff).subscribe(
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
