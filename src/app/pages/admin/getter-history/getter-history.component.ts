import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Getter } from 'src/app/shared/models/getter';
import { GetterHistoryService } from './getter-history.service';

@Component({
  selector: 'app-getter-history',
  templateUrl: './getter-history.component.html',
  styleUrls: ['./getter-history.component.css']
})
export class GetterHistoryComponent implements AfterViewInit {
  columns = ['sno', 'getterId', 'providerId', 'getterAmt', 'getterDateString', 'getterTDateString', 'getterStatus'];
  displayColumns = ['Sno', 'Getter ID', 'Provider ID', 'Getter Amt', 'Get Date', 'Transaction Date', 'Status'];
  dataSource: MatTableDataSource<Getter>;
  getterHistoryList: Getter[] = [];
  errorMessage: string;
  list = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private getterHistoryService: GetterHistoryService) {
    this.getterHistoryService.getAllGetterHistory().subscribe(
    getterHistory => {
        if (getterHistory !== null){
          this.list = true;
          this.checktype(getterHistory);
        }
      }, err => {
        this.errorMessage = (err as any);
      }
    );
    setTimeout(_ => {if (this.list === true){ this.data(); } }, 700);
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  data(){
    this.dataSource = new MatTableDataSource(this.getterHistoryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checktype(l: any){
    for (const a of l){
      if ( a.getterTransactionDate !== null) {
      this.getterHistoryList.push({
       getterTDateString : new Date(a.getterTransactionDate[0],
        a.getterTransactionDate[1],
        a.getterTransactionDate[2],
        a.getterTransactionDate[3],
        a.getterTransactionDate[4],
        a.getterTransactionDate[5])
        .toString().slice(0, 24),
       getterDateString : new Date(a.getterDate[0],
        a.getterDate[1],
        a.getterDate[2],
        a.getterDate[3],
        a.getterDate[4],
        a.getterDate[5])
        .toString().slice(0, 24),
       getterAmt : a.getterAmt,
       getterId : a.getterId,
       providerId : a.providerId,
       getterStatus : a.getterStatus
      });
    } else {
      this.getterHistoryList.push({
        getterTDateString : ' ',
        getterDateString : new Date(a.getterDate[0],
         a.getterDate[1],
         a.getterDate[2],
         a.getterDate[3],
         a.getterDate[4],
         a.getterDate[5])
         .toString().slice(0, 24),
        getterAmt : a.getterAmt,
        getterId : a.getterId,
        providerId : a.providerId,
        getterStatus : a.getterStatus
       });
    }
    }
  }

}
