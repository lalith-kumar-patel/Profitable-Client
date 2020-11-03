import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormDialogService {
  constructor(private dialog: MatDialog) { }

  openLoginForm() {
    return this.dialog.open(LoginFormComponent, {
      width: '500px'
    });
  }
}
