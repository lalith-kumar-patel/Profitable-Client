import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormService } from 'src/app/components/login-form/login-form.service';
import { FormDialogService } from 'src/app/shared/services/form-dialog.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  name: string;
  constructor(
    private loginFormService: LoginFormService,
    private formDialogService: FormDialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  logout(){
    this.name = null;
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  openLoginFormDialog() {
    const dialogRef = this.formDialogService.openLoginForm();

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      try{
      this.loginFormService.get().subscribe((res) => {
        this.name = res.name;
      });
    }catch (e) {}
    });
  }

}
