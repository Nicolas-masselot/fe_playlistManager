import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageAdsComponent } from './manage-ads/manage-ads.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AdsDialogComponent } from './ads-dialog/ads-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule , MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './customPaginator';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlockUIModule } from 'ng-block-ui';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ManageUsersComponent,
    ManageAdsComponent,
    ConfirmDeleteDialogComponent,
    UserDialogComponent,
    AdsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatIconModule,
    FontAwesomeModule,
    BlockUIModule.forRoot(), 
    MatDialogModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useValue: CustomPaginator()}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
