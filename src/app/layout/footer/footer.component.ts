import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  yearFromDate: number;
  tooltipText = 'copy';
  email = 'john.doe@example.com';
  phoneNumber = '9988776622';

  constructor() { }

  ngOnInit(): void {
    this.yearFromDate = Date.now();
  }

}
