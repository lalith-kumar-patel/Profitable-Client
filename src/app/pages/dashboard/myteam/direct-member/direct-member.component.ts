import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DirectMemberService } from './direct-member.service';
import { DirectMember } from 'src/app/shared/models/directMember';

@Component({
  selector: 'app-direct-member',
  templateUrl: './direct-member.component.html',
  styleUrls: ['./direct-member.component.css']
})
export class DirectMemberComponent implements AfterViewInit {
  displayedColumns = ['id', 'userCode', 'name', 'status', 'joinDate', 'commitment'];
  dataSource: MatTableDataSource<DirectMember>;
  loggedInCustomer: any;
  directMemberList: DirectMember[] = null;
  errorMessage: string;
  list = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private directMemberService: DirectMemberService) {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer'));
    this.directMemberService.getDirectMembers(this.loggedInCustomer.id).subscribe(
    directMember => {
        if (directMember.length !== 0){
          this.list = true;
          this.directMemberList = directMember;
          console.log(this.directMemberList);
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
    this.dataSource = new MatTableDataSource(this.directMemberList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
