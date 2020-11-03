// Core Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Tool imports
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Pipes
import { DatePipe } from './shared/pipes/date-converter.pipe';
import { DatePipe as DatePipe2 } from '@angular/common';

// Component imports
import { AppComponent } from './app.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthErrorComponent } from './components/auth-error/auth-error.component';
import { PersonalDetailsFormComponent } from './pages/dashboard/profile/personal-details-form/personal-details-form.component';
import { BankDetailsFormComponent } from './pages/dashboard/profile/bank-details-form/bank-details-form.component';
import { DashHomeComponent } from './pages/dashboard/dash-home/dash-home.component';
import { DirectMemberComponent } from './pages/dashboard/myteam/direct-member/direct-member.component';
import { DownlineMemberComponent } from './pages/dashboard/myteam/downline-member/downline-member.component';
import { NotificationComponent } from './pages/dashboard/dash-home/notification/notification.component';
import { NotificationComponent as NotificationComponent1 } from './pages/admin/admin-home/notification/notification.component';
import { NotfDialogComponent } from './pages/dashboard/dash-home/notification/notf-dialog/notf-dialog.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { RequestsComponent } from './pages/admin/requests/requests.component';
import { AllRequestsTableComponent } from './pages/admin/requests/all-requests-table/all-requests-table.component';
import { ProvideHistoryComponent } from './pages/dashboard/provide-history/provide-history.component';
import { GetHistoryComponent } from './pages/dashboard/get-history/get-history.component';
import { PersonalDetailsComponent } from './pages/admin/profile/personal-details/personal-details.component';
import { ReCommitmentComponent } from './pages/dashboard/re-commitment/re-commitment.component';
import { GrowthBonusComponent } from './pages/dashboard/withdraw/growth-bonus/growth-bonus.component';
import { PrincipalComponent } from './pages/dashboard/withdraw/principal/principal.component';
import { BankDetailsComponent } from './pages/admin/profile/bank-details/bank-details.component';
import { ProviderHistoryComponent } from './pages/admin/provider-history/provider-history.component';
import { GetterHistoryComponent } from './pages/admin/getter-history/getter-history.component';
import { AllMembersComponent } from './pages/admin/all-members/all-members.component';
import { RegisterComponent } from './pages/register/register.component';
import { SpeedBonusComponent } from './pages/dashboard/withdraw/speed-bonus/speed-bonus.component';
import { LevelBonusComponent } from './pages/dashboard/withdraw/level-bonus/level-bonus.component';
import { OtpDialogComponent } from './components/register-form/otp-dialog/otp-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    RegisterFormComponent,
    LoginFormComponent,
    DashboardComponent,
    AuthErrorComponent,
    PersonalDetailsFormComponent,
    BankDetailsFormComponent,
    DashHomeComponent,
    DirectMemberComponent,
    DownlineMemberComponent,
    DatePipe,
    NotfDialogComponent,
    NotificationComponent,
    NotificationComponent1,
    AdminComponent,
    AdminHomeComponent,
    RequestsComponent,
    AllRequestsTableComponent,
    ProvideHistoryComponent,
    GetHistoryComponent,
    PersonalDetailsComponent,
    ReCommitmentComponent,
    GrowthBonusComponent,
    PrincipalComponent,
    BankDetailsComponent,
    ProviderHistoryComponent,
    GetterHistoryComponent,
    AllMembersComponent,
    RegisterComponent,
    SpeedBonusComponent,
    LevelBonusComponent,
    OtpDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    FlexLayoutModule,
  ],
  providers: [DatePipe2],
  bootstrap: [AppComponent],
})
export class AppModule {}
