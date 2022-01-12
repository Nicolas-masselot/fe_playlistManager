import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { HistoryComponent } from './history/history.component';
import { WatchComponent } from './watch/watch.component';
import { SearchContainerComponent } from './search-container/search-container.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
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
        path:'search',
        component: SearchContainerComponent
      },
      { path: 'watch/:id', 
        component: WatchComponent 
      },
      { path: 'history', 
        component: HistoryComponent 
      },
      { path: 'playlist/:id', 
        component: PlaylistDetailComponent 
      },
    ]
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
