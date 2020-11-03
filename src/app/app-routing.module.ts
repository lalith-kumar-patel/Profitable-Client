import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { ProfitableGoalsRoutingGuard } from './app.routing-guard';

// pages
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthErrorComponent } from './components/auth-error/auth-error.component';
import { PersonalDetailsFormComponent } from './pages/dashboard/profile/personal-details-form/personal-details-form.component';
import { BankDetailsFormComponent } from './pages/dashboard/profile/bank-details-form/bank-details-form.component';
import { DashHomeComponent } from './pages/dashboard/dash-home/dash-home.component';
import { DirectMemberComponent } from './pages/dashboard/myteam/direct-member/direct-member.component';
import { DownlineMemberComponent } from './pages/dashboard/myteam/downline-member/downline-member.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { RequestsComponent } from './pages/admin/requests/requests.component';
import { ProvideHistoryComponent } from './pages/dashboard/provide-history/provide-history.component';
import { GetHistoryComponent } from './pages/dashboard/get-history/get-history.component';
import { PersonalDetailsComponent } from './pages/admin/profile/personal-details/personal-details.component';
import { ReCommitmentComponent } from './pages/dashboard/re-commitment/re-commitment.component';
import { GrowthBonusComponent } from './pages/dashboard/withdraw/growth-bonus/growth-bonus.component';
import { PrincipalComponent } from './pages/dashboard/withdraw/principal/principal.component';
import { BankDetailsComponent } from './pages/admin/profile/bank-details/bank-details.component';
import { GetterHistoryComponent } from './pages/admin/getter-history/getter-history.component';
import { ProviderHistoryComponent } from './pages/admin/provider-history/provider-history.component';
import { AllMembersComponent } from './pages/admin/all-members/all-members.component';
import { RegisterComponent } from './pages/register/register.component';
import { SpeedBonusComponent } from './pages/dashboard/withdraw/speed-bonus/speed-bonus.component';
import { LevelBonusComponent } from './pages/dashboard/withdraw/level-bonus/level-bonus.component';


const routes: Routes = [
  { path: 'error', component: AuthErrorComponent },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent, 
    // canActivate: [ProfitableGoalsRoutingGuard],
    children: [
      { path: '', component: DashHomeComponent },
      { path: 'personal-details', component: PersonalDetailsFormComponent },
      { path: 'bank-details', component: BankDetailsFormComponent },
      { path: 'direct-member', component: DirectMemberComponent },
      { path: 'downline-member', component: DownlineMemberComponent },
      { path: 'provide-history', component: ProvideHistoryComponent },
      { path: 'get-history', component: GetHistoryComponent },
      { path: 'growth-bonus', component: GrowthBonusComponent },
      { path: 'principal', component: PrincipalComponent },
      { path: 'speed-bonus', component: SpeedBonusComponent },
      { path: 'level-bonus', component: LevelBonusComponent },
      { path: 'recommitment', component: ReCommitmentComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'bank-details', component: BankDetailsComponent },
      { path: 'personal-details', component: PersonalDetailsComponent },
      { path: 'all-members', component: AllMembersComponent },
      { path: 'getter-history', component: GetterHistoryComponent },
      { path: 'provider-history', component: ProviderHistoryComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
