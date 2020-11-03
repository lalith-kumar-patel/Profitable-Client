import { Component, OnInit, Input } from '@angular/core';
import { Getter } from 'src/app/shared/models/getter';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  countDown: any;

  @Input() getter: Getter;

  transactionID: string;
  errorMessage: any;
  successMessage: any;
  loggedInCustomer: any;
  flag = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer'));
    this.countDownTimer(this.getter.getterDate);
  }

  countDownTimer(joinDate) {
    const payBy =
      new Date(joinDate[0], (joinDate[1] - 1), joinDate[2], joinDate[3], joinDate[4], joinDate[5])
        .getTime() + (1000 * 60 * 60 * 12);

    const countDownInit = setInterval(() => {
      const now = new Date().getTime();
      const distance = Math.abs(now - payBy);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.countDown =
        days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
      if (now >= payBy) {
        clearInterval(countDownInit);
        this.countDown = 'Expired';
        this.flag = true;
      }
    });
  }

  getterSubmit(){
    let getterDataToDB: Getter = null;
    this.errorMessage = null;
    this.successMessage = null;
    getterDataToDB = { providerId: this.getter.providerId};
    getterDataToDB.getterId = this.getter.getterId;
    getterDataToDB.getterDate = this.getter.getterDate;

    this.notificationService.updateGetterTransaction(getterDataToDB).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

  getterReject(){
    let getterDataToDB: Getter = null;
    this.errorMessage = null;
    this.successMessage = null;
    getterDataToDB = { providerId: this.getter.providerId};
    getterDataToDB.getterId = this.getter.getterId;
    getterDataToDB.getterDate = this.getter.getterDate;

    this.notificationService.getterRejected(getterDataToDB).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

}
