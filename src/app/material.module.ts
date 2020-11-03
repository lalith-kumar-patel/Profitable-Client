import { NgModule } from '@angular/core';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';


// cdk
import { ClipboardModule } from '@angular/cdk/clipboard';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatCheckboxModule,
  MatGridListModule,
  MatDialogModule,
  MatDividerModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatTreeModule,
  MatTooltipModule,
  ClipboardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatExpansionModule,
  MatMenuModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
