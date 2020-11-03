import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormDialogService } from 'src/app/shared/services/form-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featureCardNames = [
    [
      'Instant Income',
      'Easy Withdrawal',
      'Direct Income'
    ],
    [
      'Level Income',
      'Daily Growth',
      'Rewards'
    ]
  ];

  imgUrls = [
    [
      '../../assets/home_assets/instant_income.jpg',
      '../../assets/home_assets/cash_withdrawal.jpg',
      '../../assets/home_assets/direct_income.png'
    ],
    [
      '../../assets/home_assets/level_income.jpg',
      '../../assets/home_assets/daily_growth.jpg',
      '../../assets/home_assets/rewards.png'
    ]
  ];

  constructor(
    private formDialogService: FormDialogService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}

