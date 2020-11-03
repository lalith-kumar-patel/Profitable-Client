import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router, ActivatedRoute } from '@angular/router';

interface MenuNode {
  name: string;
  children?: MenuNode[];
  url?: string;
}

const MENU_DATA: MenuNode[] = [
  { name: 'Dashboard', url: '/dashboard' },
  {
    name: 'Profile',
    children: [
      { name: 'Personal Details', url: '/dashboard/personal-details' },
      { name: 'Bank Details', url: '/dashboard/bank-details' }
    ]
  },
  {
    name: 'My Team',
    children: [
      { name: 'Direct Member', url: '/dashboard/direct-member' },
      { name: 'Downline Member', url: '/dashboard/downline-member' }
    ]
  },
  {
    name: 'Withdraw',
    children: [
      { name: 'Growth Bonus', url: '/dashboard/growth-bonus' },
      { name: 'Level Bonus', url: '/dashboard/level-bonus' },
      { name: 'Speed Bonus', url: '/dashboard/speed-bonus' },
      { name: 'Principal', url: '/dashboard/principal' }
    ]
  },
  { name: 'Provide History', url: '/dashboard/provide-history' },
  { name: 'Get History', url: '/dashboard/get-history' },
  { name: 'Re-commitment', url: '/dashboard/recommitment' },
];

interface MenuFlatNode {
  expendable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opened = true;

  treeControl = new FlatTreeControl<MenuFlatNode>(node => node.level, node => node.expendable);

  private transformer = (node: MenuNode, level: number) => {
    return {
      expendable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      url: node.url
    };
  }

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expendable, node => node.children);
  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource.data = MENU_DATA;
  }

  hasChild = (_: number, node: MenuFlatNode) => node.expendable;

  ngOnInit(): void {
  }

  navigateToLink(link: string) {
    this.router.navigate([link], { relativeTo: this.route });
  }

}
