import { AfterViewInit, Component , ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from '../customPaginator';
import {MatTableDataSource} from '@angular/material/table';
import { MessageService } from '../services/message.service';
import {ToastrService} from "ngx-toastr";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

export interface Advertisement{
  idAd:number,
  emailAdvertiser:string,
  adName:string
}

@Component({
  selector: 'app-manage-ads',
  templateUrl: './manage-ads.component.html',
  styleUrls: ['./manage-ads.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() } 
  ]
})
export class ManageAdsComponent implements AfterViewInit {

  @BlockUI() blockUI!: NgBlockUI;
  faSearch = faSearch ;
  colonnes: string[] = ["infosAd","options"];
  datasource = new MatTableDataSource<Advertisement>(DATA_TEST) ;
  roleUser: string | undefined ;
  idUser: number | undefined ;

  constructor(private service:MessageService,private toastr: ToastrService,private authserv:AuthService,private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {

    this.paginator._intl.itemsPerPageLabel = "Ads per page :";
    this.datasource.paginator = this.paginator ;
    this.idUser = this.authserv.userID;
    this.roleUser = this.authserv.role ;
    //this.roleUser = "admin";

    if (this.roleUser == "admin") {
      this.service.sendMessage('recupAllAds',{}).subscribe(
        (response)=>{
          this.datasource.data = response.data ;
        },
        (error) => {
          this.toastr.error("Une erreur s'est produite");
          console.log(error) ;
        }
      );
    } else {
      this.service.sendMessage('recupAds',{idAdvertiser: this.idUser}).subscribe(
        (response)=>{
          this.datasource.data = response.data ;
        },
        (error) => {
          this.toastr.error("Une erreur s'est produite");
          console.log(error) ;
        }
      );
    }

  }

  filtrerAds(event:Event){
    const nomAd= (event.target as HTMLInputElement).value;
    this.datasource.filter = nomAd.trim().toLowerCase() ;
  }

  openDialogAds(idAd:number,typeDialog:number){
    if (typeDialog == 1) {
      console.log("modifs pour ad "+idAd)
    } else {
      const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent,{
        data : {
          message: "Once you delete this advertise, there is no going back. Please be certain.",
          buttonText: {
            deleteconfirmed: "Delete advertise",
            canceldelete: "Cancel"
          }
        }
      });

      dialogRef.afterClosed().subscribe((confirmedDelete:boolean) => {
        if (confirmedDelete) {
          this.blockUI.start('Loading...');
          this.service.sendMessage('deleteAd',{idAnnonce: idAd}).subscribe(
            (response)=>{
              this.toastr.success("Ad deleted successfully");
              console.log(response);
              this.blockUI.stop();
            },
            (error) => {
              this.toastr.error("Une erreur s'est produite");
              console.log(error) ;
              this.blockUI.stop();
            }
          );
        }
      });
    }
  }

}

const DATA_TEST: Advertisement[] = [
  {idAd:1,emailAdvertiser:"mail1@test.com", adName: "ad1"},
  {idAd:2,emailAdvertiser:"mail2@test.com", adName: "ad2"},
  {idAd:69,emailAdvertiser:"mail69@test.com", adName: "ad69"},
  {idAd:420,emailAdvertiser:"mail420@test.com", adName: "ad420"},
  {idAd:1,emailAdvertiser:"mail1@test.com", adName: "ad1"},
  {idAd:2,emailAdvertiser:"mail2@test.com", adName: "ad2"},
  {idAd:69,emailAdvertiser:"mail69@test.com", adName: "ad69"},
  {idAd:420,emailAdvertiser:"mail420@test.com", adName: "ad420"},
  {idAd:1,emailAdvertiser:"mail1@test.com", adName: "ad1"},
  {idAd:2,emailAdvertiser:"mail2@test.com", adName: "ad2"},
  {idAd:69,emailAdvertiser:"mail69@test.com", adName: "ad69"},
  {idAd:420,emailAdvertiser:"mail420@test.com", adName: "ad420"},
  {idAd:1,emailAdvertiser:"mail1@test.com", adName: "ad1"},
  {idAd:2,emailAdvertiser:"mail2@test.com", adName: "ad2"},
  {idAd:69,emailAdvertiser:"mail69@test.com", adName: "ad69"},
  {idAd:420,emailAdvertiser:"mail420@test.com", adName: "ad420"},
  {idAd:1,emailAdvertiser:"mail1@test.com", adName: "ad1"},
  {idAd:2,emailAdvertiser:"mail2@test.com", adName: "ad2"},
  {idAd:69,emailAdvertiser:"mail69@test.com", adName: "ad69"},
  {idAd:420,emailAdvertiser:"mail420@test.com", adName: "ad420"},
]
