import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/customer';
import { Getter } from 'src/app/shared/models/getter';
import { Notification } from 'src/app/shared/models/notification';
import { Provider } from 'src/app/shared/models/provider';
import { Staff } from 'src/app/shared/models/staff';
import { RequestsService } from './requests.service';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  private static notificationsIndex = 0;
  private static firstObject = null;

  // assign new data here
  providerRequestData: Provider[] = [
    {
      providerId: 10001,
      providerName: 'Carlton',
      providerAmt: 2000
    },
    // {
    //   providerId: 10002,
    //   providerName: 'Blaise',
    //   providerAmt: 10000
    // },
    // {
    //   providerId: 10003,
    //   providerName: 'Shawn',
    //   providerAmt: 20000
    // },
    // {
    //   providerId: 10004,
    //   providerName: 'John',
    //   providerAmt: 5000
    // },
    // {
    //   providerId: 10005,
    //   providerName: 'Gretal',
    //   providerAmt: 20000
    // }
  ];

  getterRequestData: Getter[] = [
    {
      getterId: 10006,
      getterName: 'Robert',
      getterAmt: 20000
    },
    // {
    //   getterId: 10007,
    //   getterName: 'Mercy',
    //   getterAmt: 3000
    // },
    // {
    //   getterId: 10008,
    //   getterName: 'Rosaline',
    //   getterAmt: 20000
    // },
    // {
    //   getterId: 10009,
    //   getterName: 'Luiza',
    //   getterAmt: 10000
    // }
  ];

  admin: Staff = { id: 99999, name: 'xyz' };

  listOfProviders: Customer[] = [
    {
      id: 99999,
      name: 'xyz'
    }
  ];
  // end

  notifications: Notification[] = [
    {
      provideFrom: null,
      providerName: null,
      amount: null,
      getterName: null,
      getTo: null,
      defaultGetter: null,
      defaultProvider: null
    }
  ];

  providerObject: Provider = null;
  getterObject: Getter = null;
  filteredLengthProvider: number = null;
  filteredLengthGetter: number = null;
  showAllActiveMembers = false;
  amount = null;

  errorMessage: any;
  successMessage: any;

  private static incrementIndex() {
    RequestsComponent.notificationsIndex += 1;
  }

  private static decrementIndex() {
    RequestsComponent.notificationsIndex -= 1;
  }

  private static clearFirstObject() {
    RequestsComponent.firstObject = null;
  }

  constructor(private requestsService: RequestsService) {}

  ngOnInit(): void {
    this.getAllRequests();
    this.admin = JSON.parse(sessionStorage.getItem('staff'));
    console.log(this.admin);
  }

  // TODO: tab disable and enable feature
  // TODO: fix tab switch feature

  private resetNotificationCreation() {
    RequestsComponent.incrementIndex();
    RequestsComponent.clearFirstObject();
    this.getterObject = null;
    this.providerObject = null;
    this.amount = null;
    this.filteredLengthProvider = null;
    this.filteredLengthGetter = null;
  }

  private deleteNotification(notification: Notification) {
    const index = this.notifications.findIndex(
      (currentObj) => currentObj === notification
    );
    this.notifications.splice(index, 1);
  }

  private findNoMatches(userDataObject) {
    // when provider is first object
    if (this.amount !== null && this.providerObject !== null && this.getterObject === null) {
      this.filteredLengthGetter = userDataObject.filter((object) => {
        return object.getterAmt === this.amount;
      }).length;
      console.log(this.filteredLengthGetter);
    }
    // when getter is first object
    else if (this.amount !== null && this.providerObject === null && this.getterObject !== null) {
      this.filteredLengthProvider = userDataObject.filter((object) => {
        return object.providerAmt === this.amount;
      }).length;
      console.log(this.filteredLengthProvider);
    }
  }

  selectCustomerFromAllRequests(customer: Customer) {
    const index = this.listOfProviders.findIndex(
      (currentObj) => currentObj === customer
    );
    this.listOfProviders.splice(index, 1);
    this.notifications[RequestsComponent.notificationsIndex].provideFrom = customer.id;
    this.notifications[RequestsComponent.notificationsIndex].providerName = customer.name;
    this.notifications[RequestsComponent.notificationsIndex].defaultProvider = true;
    this.resetNotificationCreation();
  }

  createNotificationObject() {
    if (this.providerObject === null && this.getterObject !== null) {
      this.showAllActiveMembers = false;
      this.notifications.splice(RequestsComponent.notificationsIndex, 0, {
        getTo: this.getterObject.getterId,
        getterName: this.getterObject.getterName,
        amount: this.getterObject.getterAmt
      });
      RequestsComponent.firstObject = 'getter';
      if (this.filteredLengthProvider <= 0) {
        // new change
        this.selectedGetter(this.getterObject.getterId);
        this.showAllActiveMembers = true;
      }

    } else if (this.providerObject !== null && this.getterObject === null) {
      this.notifications.splice(RequestsComponent.notificationsIndex, 0, {
        provideFrom: this.providerObject.providerId,
        providerName: this.providerObject.providerName,
        amount: this.providerObject.providerAmt
      });
      RequestsComponent.firstObject = 'provider';

      // for admin
      if (this.filteredLengthGetter <= 0) {
        this.notifications[RequestsComponent.notificationsIndex].getTo = this.admin.id;
        this.notifications[RequestsComponent.notificationsIndex].getterName = this.admin.name;
        this.notifications[RequestsComponent.notificationsIndex].defaultGetter = true;
        this.resetNotificationCreation();
      }

    } else if (RequestsComponent.firstObject === 'provider') {
      this.notifications[RequestsComponent.notificationsIndex].getTo = this.getterObject.getterId;
      this.notifications[RequestsComponent.notificationsIndex].getterName = this.getterObject.getterName;
      this.notifications[RequestsComponent.notificationsIndex].defaultGetter = false;
      this.resetNotificationCreation();

    } else if (RequestsComponent.firstObject === 'getter') {
      this.notifications[RequestsComponent.notificationsIndex].provideFrom = this.providerObject.providerId;
      this.notifications[RequestsComponent.notificationsIndex].providerName = this.providerObject.providerName;
      this.notifications[RequestsComponent.notificationsIndex].defaultProvider = false;
      this.resetNotificationCreation();
    }
  }

  getProviderObject(providerObject: Provider) {
    this.providerObject = providerObject;
    this.amount = providerObject.providerAmt;
    // deletion from provider request table
    const indexOfProvider = this.providerRequestData.findIndex(
      (currentObj) => currentObj.providerId === providerObject.providerId
    );
    this.providerRequestData.splice(indexOfProvider, 1);
    this.findNoMatches(this.getterRequestData);
    this.createNotificationObject();
  }

  getGetterObject(getterObject: Getter) {
    this.getterObject = getterObject;
    this.amount = getterObject.getterAmt;
    // deletion from getter request table
    const indexOfGetter = this.getterRequestData.findIndex(
      (currentObj) => currentObj.getterId === getterObject.getterId
    );
    this.getterRequestData.splice(indexOfGetter, 1);
    this.findNoMatches(this.providerRequestData);
    this.createNotificationObject();
  }

  handleCancelNotfRequest(notification: Notification) {

    this.amount = null;
    this.deleteNotification(notification);
    this.filteredLengthProvider = null;
    this.filteredLengthGetter = null;
    this.showAllActiveMembers = false;
    RequestsComponent.clearFirstObject();

    if (this.providerObject === null && this.getterObject !== null) {
      this.getterRequestData.splice(0, 0, {
        getterId: notification.getTo,
        getterName: notification.getterName,
        getterAmt: notification.amount
      });
      this.getterObject = null;
    } else if (this.providerObject !== null && this.getterObject === null) {
      this.providerRequestData.splice(0, 0, {
        providerId: notification.provideFrom,
        providerName: notification.providerName,
        providerAmt: notification.amount
      });
      this.providerObject = null;
    } else {
      if (notification.defaultGetter) {
        this.providerRequestData.splice(0, 0, {
          providerId: notification.provideFrom,
          providerName: notification.providerName,
          providerAmt: notification.amount
        });
      }
      else if (notification.defaultProvider) {
        this.getterRequestData.splice(0, 0, {
          getterId: notification.getTo,
          getterName: notification.getterName,
          getterAmt: notification.amount
        });

        // adding back to listOfProviders

        this.listOfProviders.splice(0, 0, {
          id: notification.provideFrom,
          fname: notification.providerName.split(' ')[0],
          lname: notification.providerName.split(' ')[1]
        });
      }
      else {
        this.getterRequestData.splice(0, 0, {
          getterId: notification.getTo,
          getterName: notification.getterName,
          getterAmt: notification.amount
        });
        this.providerRequestData.splice(0, 0, {
          providerId: notification.provideFrom,
          providerName: notification.providerName,
          providerAmt: notification.amount
        });
      }
      this.getterObject = null; this.providerObject = null;
      RequestsComponent.decrementIndex();
    }
  }

  // change by lalith
  getAllRequests(){
    this.errorMessage = null;

    this.requestsService.getAllRequests().subscribe(
      (response) => {
        const mp = new Map();
        Object.keys ( response ). forEach (k => { mp.set(k, response[k]); });
        console.log(mp);
        this.getterRequestData = mp.get('getters');
        this.providerRequestData = mp.get('providers');
      }, error => {
        this.errorMessage = (error as any);
      }
    );
  }

  selectedGetter(id){
    this.errorMessage = null;
    this.requestsService.selectedGetter(id).subscribe(
          (response) => {
            this.listOfProviders = response;
            console.log(this.listOfProviders);
          },
          (err) => {
            this.errorMessage = err as any;
          }
        );
  }

  allocateNotification(notification){
    this.errorMessage = null;
    this.successMessage = null;
    notification.providerName = null;
    notification.amount = null;
    notification.getterName = null;

    this.requestsService.allocateNotification(notification).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response;
      }, error => {
        this.errorMessage = (error as any);
      }
    );
    this.deleteNotification(notification);
  }
}
