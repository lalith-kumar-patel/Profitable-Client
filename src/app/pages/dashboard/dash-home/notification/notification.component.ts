import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Getter } from 'src/app/shared/models/getter';
import { Provider } from 'src/app/shared/models/provider';
import { NotfDialogComponent } from './notf-dialog/notf-dialog.component';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  countDown: any;

  @Input() getter: Getter;
  @Input() provider: Provider;

  transactionID: string;
  errorMessage: any;
  successMessage: any;
  loggedInCustomer: any;
  flag = false;

  constructor(private dialog: MatDialog, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer'));
    if (this.provider){
      this.countDownTimer(this.provider.providerDate);
    }else{
      this.countDownTimer(this.getter.getterDate);
    }
  }

  openPaymentDetailsDialog() {
    const dialogRef = this.dialog.open(NotfDialogComponent, {
      data: {
        getterId: this.provider.getterId,
        getterName: this.provider.getterName,
        getterGPAY: this.provider.getterPhoneNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('From notf dialog', result);
      this.transactionID = result;
      this.providersubmit();
    });
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

  providersubmit(){
    let providerDataToDB: Provider = null;
    this.errorMessage = null;
    this.successMessage = null;
    providerDataToDB = { providerId: this.provider.providerId};
    providerDataToDB.getterId = this.provider.getterId;
    providerDataToDB.providerTransactionId = this.transactionID;
    providerDataToDB.providerDate = this.provider.providerDate;

    this.notificationService.updateProviderTransaction(providerDataToDB).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
        this.loggedInCustomer.notiId = null;
        sessionStorage.setItem('customer', JSON.stringify(this.loggedInCustomer));
      }, error => {
        this.errorMessage = (error as any);
      }
    );
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
        this.loggedInCustomer.notiId = null;
        sessionStorage.setItem('customer', JSON.stringify(this.loggedInCustomer));
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
