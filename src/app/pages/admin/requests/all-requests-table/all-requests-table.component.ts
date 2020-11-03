import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Getter } from 'src/app/shared/models/getter';
import { Provider } from 'src/app/shared/models/provider';


@Component({
  selector: 'app-all-requests-table',
  templateUrl: './all-requests-table.component.html',
  styleUrls: ['./all-requests-table.component.css'],
})
export class AllRequestsTableComponent implements OnInit {
  @Input() dataSource: Getter[] | Provider[];
  @Input() isProvider: boolean;
  @Input() filterAmount: number;
  @Input() buttonDisabled: boolean;
  @Input() noMatchFound: number;

  @Output() userDataObject: EventEmitter<Getter | Provider> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  onUserSelect(data: Provider | Getter) {
    this.userDataObject.emit(data);
  }
}
