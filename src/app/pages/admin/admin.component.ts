import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginValidators } from 'src/app/shared/validators/login.validator';
import { AdminService } from './admin.service';
import { Staff } from 'src/app/shared/models/staff';

interface MenuNode {
  name: string;
  children?: MenuNode[];
  url?: string;
}

const TREE_DATA: MenuNode[] = [
  {
    name: 'Home',
    url: '/admin'
  },
  { name: 'Profile',
    children: [
      { name: 'Personal Details', url: '/admin/personal-details' },
      { name: 'Bank Details', url: '/admin/bank-details'}
    ]
  },
  {
    name: 'Requests',
    url: '/admin/requests'
  },
  {
    name: 'All members',
    url: '/admin/all-members'
  },
  {
    name: 'Providers History',
    url: '/admin/provider-history'
  },
  {
    name: 'Getters History',
    url: '/admin/getter-history'
  }
];

interface MenuFlatNode {
  expendable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoggedIn = false;
  hide = true;
  tryToLogin = false;
  loginForm: FormGroup;
  errorMessage: any;
  successMessage: any;
  staff: Staff;

  private transformer = (node: MenuNode, level: number) => {
    return {
      expendable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      url: node.url
    };
  }

  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<MenuFlatNode>(node => node.level, node => node.expendable);

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expendable, node => node.children);

  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: MenuFlatNode) => node.expendable;

  ngOnInit() {
    this.staff = new Staff();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      emailId: [this.staff.emailId, [Validators.required, LoginValidators.validateEmailId], null],
      password: [this.staff.password, [Validators.required, LoginValidators.validatePassword], null]
    });
  }

  login() {
    this.errorMessage = null;
    this.successMessage = null;
    this.isLoggedIn = false;
    this.tryToLogin = true;
    this.staff = this.loginForm.value as Staff;

    this.adminService.login(this.staff).subscribe(
      (response) => {
        console.log(response);
        this.staff = response;
        this.isLoggedIn = false;
        this.tryToLogin = true;
        sessionStorage.setItem('staff', JSON.stringify(this.staff));
        sessionStorage.setItem('staffBankdetails', JSON.stringify(this.staff.bank));
        sessionStorage.setItem('userType', JSON.stringify('Staff'));
        setTimeout(_ => {this.isLoggedIn = true; this.tryToLogin = false; }, 700);
      }, error => {
        this.isLoggedIn = false;
        this.tryToLogin = false;
        this.errorMessage = (error as any);
      }
    );
  }

  navigateToLink(link: string) {
    this.router.navigate([link], { relativeTo: this.route });
  }

}
