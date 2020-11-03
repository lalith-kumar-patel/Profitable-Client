import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Provider } from 'src/app/shared/models/provider';
import { ProvideHistoryService } from './provide-history.service';

@Component({
  selector: 'app-provide-history',
  templateUrl: './provide-history.component.html',
  styleUrls: ['./provide-history.component.css']
})
export class ProvideHistoryComponent implements OnInit {
  columns = ['sno', 'providerId', 'getterId', 'providerAmt', 'providerDateString', 'providerTransactionId', 'providerTDate', 'providerStatus'];
  displayColumns = ['Sno', 'Provider ID', 'Getter ID', 'Provider Amt', 'Provide Date', 'Transaction ID', 'Transaction Date', 'Status'];
  dataSource: MatTableDataSource<Provider>;
  loggedInCustomer: any;
  providerHistoryList: Provider[] = [];
  errorMessage: string;
  list = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private provideHistoryService: ProvideHistoryService) {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer'));
    this.provideHistoryService.getProviderHistory(this.loggedInCustomer.id).subscribe(
    providerHistory => {
        if (providerHistory !== null){
          this.list = true;
          this.checktype(providerHistory);
        }
      }, err => {
        this.errorMessage = (err as any);
      }
    );
    setTimeout(_ => {if (this.list === true){ this.data(); } }, 700);
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  data(){
    this.dataSource = new MatTableDataSource(this.providerHistoryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checktype(l: any){
    for ( const a of l){
      this.providerHistoryList.push({
       providerTDate : new Date(a.providerTransactionDate[0],
        a.providerTransactionDate[1],
        a.providerTransactionDate[2],
        a.providerTransactionDate[3],
        a.providerTransactionDate[4],
        a.providerTransactionDate[5])
        .toString().slice(0, 24),
       providerDateString : new Date(a.providerDate[0],
        a.providerDate[1],
        a.providerDate[2],
        a.providerDate[3],
        a.providerDate[4],
        a.providerDate[5])
        .toString().slice(0, 24),
       providerAmt : a.providerAmt,
       getterId : a.getterId,
       providerId : a.providerId,
       providerStatus : a.providerStatus,
       providerTransactionId : a.providerTransactionId
      });
    }
  }

}
