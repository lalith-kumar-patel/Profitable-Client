import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WithdrawEngine } from '../withdraw_engine';

@Component({
  selector: 'app-level-bonus',
  templateUrl: './level-bonus.component.html',
  styleUrls: ['./level-bonus.component.css']
})
export class LevelBonusComponent implements OnInit {

  invalidInput = true;
  withdrawDisable: boolean;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.withdrawDisable = WithdrawEngine.speedAndLevelBonusWorkingHours(new Date());
    if (this.withdrawDisable) {
      this.toastr.warning('Can\'t withdraw level bonus today', 'Message', {
        closeButton: true
      });
    }
  }

  validateInputAmount(event: any) {
    if (event.target.value > 200) { this.invalidInput = true; }
    else { this.invalidInput = false; }
  }

}
