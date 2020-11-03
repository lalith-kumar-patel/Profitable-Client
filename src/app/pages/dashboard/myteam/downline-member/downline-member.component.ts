import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DownlineMemberService } from './downline-member.service';
import { DownlineMember } from 'src/app/shared/models/downlineMember';


@Component({
  selector: 'app-downline-member',
  templateUrl: './downline-member.component.html',
  styleUrls: ['./downline-member.component.css']
})
export class DownlineMemberComponent implements AfterViewInit {

  displayedColumns = ['id', 'userCode', 'name', 'pack', 'joinDate', 'totSponsor'];
  dataSource: MatTableDataSource<DownlineMember>;
  loggedInCustomer: any;
  downlineMemberList: DownlineMember[] = null;
  errorMessage: string;
  list = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private downlineMemberService: DownlineMemberService) {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer'));
    this.downlineMemberService.getDownlineMembers(this.loggedInCustomer.id).subscribe(
    downlineMember => {
        if (downlineMember.length !== 0){
          this.list = true;
          this.downlineMemberList = downlineMember;
          console.log(this.downlineMemberList);
        }
        // sessionStorage.setItem("cart", JSON.stringify(this.cartList));
      }, err => {
        this.errorMessage = (err as any);
      }
    );
    setTimeout(_ => this.data(), 700);
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
    this.dataSource = new MatTableDataSource(this.downlineMemberList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
