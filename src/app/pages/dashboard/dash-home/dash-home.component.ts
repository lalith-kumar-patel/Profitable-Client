import { Component, OnInit } from '@angular/core';
import { Getter } from 'src/app/shared/models/getter';
import { Income } from 'src/app/shared/models/income';
import { Provider } from 'src/app/shared/models/provider';
import { DashHomeService } from './dash-home.service';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css'],
})
export class DashHomeComponent implements OnInit {
  data1: any;
  data2: any;
  data3: any;
  loggedInCustomer: any;
  tooltipText = 'copy';
  link = 'http://localhost:4200/register?referralId=';
  linkData = ((('✌🏾BOOM!! BOOM!! BOOM!!✌\n🤹🏻‍♀HURRY! UP! HURRY! UP!🤹🏻‍♀‍\n\n').concat(this.link)).concat('\n\nOUR PLAN\n\n•	Daily Growth 2.5%.\n•	Daily Growth For 30 Days.\n•	Primary Link 10%.\n•	Secondary Link 90%.\n\nOUR PACKAGE\n\n•	5000 – Primary 500\n•	10000 - Primary 1000\n•	15000 - Primary 1500\n•	20000 - Primary 2000\n•	25000 - Primary 2500\n•	30000 - Primary 3000\n\nACHIEVEMANTS\n\n•	1 Lakh – 5000 Cash\n•	2 Lakh – 10000 Cash\n•	3 Lakh – 15000 Cash\n•	4 Lakh – 20000 Cash\n•	5 Lakh – 25000 Cash\n\nLEVEL INCOME\n\n•	1 Level – 5%\n•	2 Level – 3%\n•	3 Level – 2%\n•	4 Level – 1%\n•	5 Level – 1%\n\n\nTERMS & CONDITIONS\n•	Primary Link – 12 To 24 Hrs.\n•	Secondary Link – 10 To 20 Days.\n•	Growth Will Start Once Primary Link Is Approved.\n•	Growth Will Be Given From Monday To Friday.\n•	You Can Withdraw Growth Once Secoundary Link Is Approved.\n•	Recommitment Compulsory.\n•	You Can Withdraw Principal After 15 Days. Once Recommited Primary Link Is Approved.\n•	5 Direct Compulsory For Level Income Withdrawal.\n•	Growth Withdrawal From Monday – Friday 4:00 PM To 7:00 PM In Multiple Of 1000/-.\n•	Working Withdrawal Only On Sunday From 10:00 AM To 12:00 PM In Multiple Of 2000/-.\n•	Speed Bonus 3% If PH Confirm With In 2 Hrs.\n•	If Any 90% Link Fail. Then 10% Growth With Be Deducted From Sponser Growth.\n•	PH Reject Time 24 Hrs.\n\n')).concat(this.link);
  providerData: Provider = null;
  getterData: Getter = null;
  incomeDetails: Income = null;
  errorMessage: string;
  tenPercent = false;

  constructor(
    private dashHomeService: DashHomeService
  ) {}

  ngOnInit(): void {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer'));
    this.link = this.link.concat(String(this.loggedInCustomer.id));
    if (this.loggedInCustomer.notiId !== null){
    const s = this.loggedInCustomer.notiId.split('-');
    s[1] = Number(s[1]);
    if (s[0] === 'P') {
      this.dashHomeService
        .getProviderNotification(s[1], this.loggedInCustomer.id)
        .subscribe(
          (provider) => {
            this.providerData = provider;
            console.log(this.providerData);
          },
          (err) => {
            this.errorMessage = err as any;
          }
        );
    }else if (s[0] === 'G') {
      this.dashHomeService
        .getGetterNotification(s[1], this.loggedInCustomer.id)
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
    this.getIncome(this.loggedInCustomer.id);
  }

  getIncome(id: number){
    this.errorMessage = null;
    this.dashHomeService.getIncomeDetails(id).subscribe(
      (response) => {
        this.incomeDetails = response;
        sessionStorage.setItem('incomeDetails', JSON.stringify(this.incomeDetails));
        sessionStorage.setItem('userType', JSON.stringify('IncomeDetails'));
        this.data1 = response.annoucementData;
        this.data2 = response.achievementData;
        this.data3 = response.newMembersData;
        console.log(response);
      },
      (err) => {
        this.errorMessage = err as any;
      }
    );
  }
}
