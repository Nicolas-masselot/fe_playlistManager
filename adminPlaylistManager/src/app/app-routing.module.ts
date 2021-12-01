import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ManageAdsComponent } from './manage-ads/manage-ads.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component:AppComponent
  },
  {
    path: 'manageAds',
    component: ManageAdsComponent
  },
  {
    path: 'manageUsers',
    component: ManageUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
