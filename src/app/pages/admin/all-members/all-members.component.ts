import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/shared/models/customer';
import { AllMembersService } from './all-members.service';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.css']
})
export class AllMembersComponent implements OnInit {
  columns = ['sno', 'id', 'name', 'sponsorId', 'totSponsor', 'joinDateString', 'packageAmt', 'status'];
  displayColumns = ['Sno', 'ID', 'Name', 'Sponsor ID', 'Total Sponsor', 'Join Date', 'Package Amt', 'Status'];
  dataSource: MatTableDataSource<Customer>;
  memberList: Customer[] = [];
  errorMessage: string;
  list = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private allMembersService: AllMembersService) {
    this.allMembersService.getAllMembers().subscribe(
    response => {
        if (response !== null){
          this.list = true;
          this.checktype(response);
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
    this.dataSource = new MatTableDataSource(this.memberList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checktype(l: any){
    for ( const a of l){
      this.memberList.push({
       joinDateString : new Date(a.joinDate[0],
        a.joinDate[1],
        a.joinDate[2],
        a.joinDate[3],
        a.joinDate[4],
        a.joinDate[5])
        .toString().slice(0, 24),
       id : a.id,
       name : a.name,
       sponsorId : a.sponsorId,
       totSponsor : a.totSponsor,
       status : a.status,
       packageAmt : a.packageAmt
      });
    }
  }

}
