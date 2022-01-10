import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { BlockUIModule } from 'ng-block-ui';
import { RouterModule } from '@angular/router';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { CommonModule } from "@angular/common";
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchContainerComponent } from './search-container/search-container.component';
import { WatchComponent } from './watch/watch.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { HistoryComponent } from './history/history.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistCreateComponent } from './playlist-create/playlist-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ForgetPasswordComponent,
    DashboardUserComponent,
    UserSettingsComponent,
    DeleteAccountComponent,
    SearchInputComponent,
    SearchListComponent,
    SearchContainerComponent,
    WatchComponent,
    HistoryComponent,
    PlaylistDetailComponent,
    PlaylistCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BlockUIModule.forRoot(), 
    RouterModule,
    CommonModule,
    YouTubePlayerModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
