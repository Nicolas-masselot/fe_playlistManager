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
import { AdsDialogComponent } from '../ads-dialog/ads-dialog.component';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../services/file-upload.service';

export interface Advertisement{
  idAd:string,
  emailAdvertiser:string | null,
  fileName:string | undefined
}

export interface AdvertEdited{
  idAd:string,
  changed:boolean,
  FileAdvert:File
}

export interface AdvertAdded {
  FileAdvert:File | undefined
  fileName: string
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
  annonces: Advertisement[] = DATA_TEST;
  datasource = new MatTableDataSource<Advertisement>(this.annonces) ;
  roleUser: string | null = null ;
  idUser: string | null = "" ;
  env = environment ;

  constructor(private service:MessageService,private toastr: ToastrService,private authserv:AuthService,private dialog: MatDialog, private fileUpload:FileUploadService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {

    this.paginator._intl.itemsPerPageLabel = "Ads per page :";
    this.datasource.paginator = this.paginator ;
    this.idUser = this.authserv.userID;
    this.roleUser = this.authserv.role ;
    //this.roleUser = "admin";
    
    if (this.roleUser == environment.ADMIN_ROLE) {
      this.service.sendMessage('advertiser/getSet',{}).subscribe(
        (response)=>{
          this.annonces = response.data;
          this.datasource.data = response.data ;
        },
        (error) => {
          this.toastr.error("Une erreur s'est produite");
          console.log(error) ;
        }
      );
    } else {
      this.service.sendMessage('advertiser/getById',{_id: this.idUser}).subscribe(
        (response)=>{
          this.annonces = response.data;
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

  OpenAddAdvert():void {
    const dialogRef = this.dialog.open(AdsDialogComponent,{
      data:{
        dialogType: "addAdvert"
      }
    });

    dialogRef.afterClosed().subscribe((newAdvert: AdvertAdded)=>{
      if (newAdvert.FileAdvert) {
        this.blockUI.start('Loading...');
        this.fileUpload.sendAdFile('annoncesUpload/uploadAd', newAdvert.FileAdvert, String(this.authserv.userID)).subscribe(
          (reponseUpload)=>{
            //console.log(reponseUpload);

            newAdvert.fileName = this.authserv.userID+'_'+newAdvert.FileAdvert?.name ;
            this.service.sendMessage('addAdvert', {idUser:this.authserv.userID,fileName:newAdvert.fileName}).subscribe(
              (response)=>{
                this.toastr.success('Advertisement added successfully');
                let nouvelAnnonce = {idAd:response.data.id,emailAdvertiser:this.authserv.userEmail,fileName:newAdvert.fileName};
                this.annonces.push(nouvelAnnonce) ;
                this.datasource.data = this.annonces ;
                console.log(response);
                this.blockUI.stop() ;
              },
              (error) => {
                this.toastr.error("An error has occured while Adding the advertisement");
                console.log(error) ;
                this.blockUI.stop();
              }
            )

          },
          (error)=>{
            this.toastr.error("An error has occured while uploading the file");
            console.log(error) ;
            this.blockUI.stop();
          }
        )

      }
    });
  }

  openDialogAds(idAd:string,typeDialog:number){
    if (typeDialog == 1) {
      let indexAdTarget = this.datasource.data.findIndex(advert => advert.idAd === idAd);
      const dialogRef = this.dialog.open(AdsDialogComponent,{
        data:{
          dialogType: "editAds",
          AdvertID:idAd ,
          advertiserMail: this.annonces[indexAdTarget].emailAdvertiser,
          filename: this.annonces[indexAdTarget].fileName
        }
      });

      dialogRef.afterClosed().subscribe((editedAdd: AdvertEdited)=>{
        if (editedAdd.changed && editedAdd.FileAdvert) {
          this.blockUI.start('Loading...');

          this.fileUpload.sendAdFile('annoncesUpload/uploadAd', editedAdd.FileAdvert, String(this.authserv.userID)).subscribe(
            (reponseUpload)=>{
              //console.log(reponseUpload);
  
              let filename = this.authserv.userID+'_'+editedAdd.FileAdvert?.name ;
              this.service.sendMessage('EditAdvert', {idAd:idAd,filename }).subscribe(
                (response)=>{
                  this.toastr.success('Advertisement edited successfully');
                  let indexEdit = this.datasource.data.findIndex(annonce => annonce.idAd === idAd);
                  this.annonces[indexEdit].fileName = editedAdd.FileAdvert?.name ;
                  this.datasource.data = this.annonces ;
                  console.log(response);
                  this.blockUI.stop();
                },
                (error) => {
                  this.toastr.error("An error has occured while Updating the advertisement");
                  console.log(error) ;
                  this.blockUI.stop();
                }
              )
  
            },
            (error)=>{
              this.toastr.error("An error has occured while uploading the file");
              console.log(error) ;
              this.blockUI.stop();
            }
          )
          
        }
      })

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
              let index_todel = this.datasource.data.findIndex(annonce => annonce.idAd === idAd);
              this.annonces.splice(index_todel,1);
              this.datasource = new MatTableDataSource<Advertisement>(this.annonces) ;
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
  {idAd:'1',emailAdvertiser:"mail1@test.com",fileName:"ad.mp4"},
  {idAd:'2',emailAdvertiser:"mail2@test.com",fileName:"ad.mp4"},
  {idAd:'3',emailAdvertiser:"mail69@test.com",fileName:"ad.mp4"},
  {idAd:'4',emailAdvertiser:"mail420@test.com",fileName:"ad.mp4"},
  {idAd:'5',emailAdvertiser:"mail1@test.com",fileName:"ad.mp4"},
  {idAd:'6',emailAdvertiser:"mail2@test.com",fileName:"ad.mp4"},
  {idAd:'7',emailAdvertiser:"mail69@test.com",fileName:"ad.mp4"},
  {idAd:'8',emailAdvertiser:"mail420@test.com",fileName:"ad.mp4"},
  {idAd:'9',emailAdvertiser:"mail1@test.com",fileName:"ad.mp4"},
  {idAd:'10',emailAdvertiser:"mail2@test.com",fileName:"ad.mp4"},
  {idAd:'11',emailAdvertiser:"mail69@test.com",fileName:"ad.mp4"},
  {idAd:'12',emailAdvertiser:"mail420@test.com",fileName:"ad.mp4"},
  {idAd:'13',emailAdvertiser:"mail1@test.com",fileName:"ad.mp4"},
  {idAd:'14',emailAdvertiser:"mail2@test.com",fileName:"ad.mp4"},
  {idAd:'15',emailAdvertiser:"mail69@test.com",fileName:"ad.mp4"},
  {idAd:'16',emailAdvertiser:"mail420@test.com",fileName:"ad.mp4"},
  {idAd:'17',emailAdvertiser:"mail1@test.com",fileName:"ad.mp4"},
  {idAd:'18',emailAdvertiser:"mail2@test.com",fileName:"ad.mp4"},
  {idAd:'19',emailAdvertiser:"mail69@test.com",fileName:"ad.mp4"},
  {idAd:'20',emailAdvertiser:"mail420@test.com",fileName:"ad.mp4"},
]
