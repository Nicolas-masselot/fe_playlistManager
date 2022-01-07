import { SearchListComponent } from './search-list/search-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'dashboardUser',
    component: DashboardUserComponent
  },
  {
    path: 'userSettings',
    component: UserSettingsComponent
  },
  {
    path:'deleteAccount',
    component: DeleteAccountComponent
  },
  {
    path:'searchList',
    component: SearchListComponent
  },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
