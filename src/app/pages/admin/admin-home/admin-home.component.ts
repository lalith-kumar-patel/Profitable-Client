import { Component, OnInit } from '@angular/core';
import { Getter } from 'src/app/shared/models/getter';
import { Overview } from 'src/app/shared/models/overview';
import { Staff } from 'src/app/shared/models/staff';
import { AdminHomeService } from './admin-home.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  successMessage: any;
  errorMessage: any;
  staffData: Staff = null;
  overviewDetails: Overview = null;
  actionTypes = ['Achievement', 'Announcement'];
  selectedAction: any;
  loggedInStaff: any;
  getterData: Getter = null;

  constructor(private adminHomeService: AdminHomeService) { }

  ngOnInit(): void {
    this.loggedInStaff = JSON.parse(sessionStorage.getItem('staff'));
    if (this.loggedInStaff.notiId !== null){
    const s = this.loggedInStaff.notiId.split('-');
    s[1] = Number(s[1]);
    if (s[0] === 'G') {
      this.adminHomeService
        .getGetterNotification(s[1], this.loggedInStaff.id)
        .subscribe(
          (getter) => {
            this.getterData = getter;
            console.log(this.getterData);
          },
          (err) => {
            this.errorMessage = err as any;
          }
        );
    }
  }
    this.getOverviewDetails();
  }

  textAreaData(data: any){
  if (this.selectedAction === this.actionTypes[0]){
    this.achievementData(data);
  } else if (this.selectedAction === this.actionTypes[1]){
    this.annoucementData(data);
  }
  }

  getOverviewDetails(){
    this.errorMessage = null;
    this.adminHomeService.getOverviewDetails().subscribe(
      (response) => {
        this.overviewDetails = response;
        sessionStorage.setItem('overviewDetails', JSON.stringify(this.overviewDetails));
        sessionStorage.setItem('userType', JSON.stringify('OverviewDetails'));
        console.log(response);
      },
      (err) => {
        this.errorMessage = err as any;
      }
    );
  }

  achievementData(data){
    this.errorMessage = null;
    this.successMessage = null;
    this.staffData = { achievementData: data};
    this.adminHomeService.achievementData(this.staffData).subscribe(
      (response) => {
        this.successMessage = response;
        console.log(response);
      },
      (err) => {
        this.errorMessage = err as any;
      }
    );
  }

  annoucementData(data){
    this.errorMessage = null;
    this.successMessage = null;
    this.staffData = { annoucementData: data};
    this.adminHomeService.annoucementData(this.staffData).subscribe(
      (response) => {
        this.successMessage = response;
        console.log(response);
      },
      (err) => {
        this.errorMessage = err as any;
      }
    );
  }

}
