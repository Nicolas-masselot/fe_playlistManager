import { AfterViewInit, Component , ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from '../customPaginator';
import {MatTableDataSource} from '@angular/material/table';
import { MessageService } from '../services/message.service';
import {ToastrService} from "ngx-toastr";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

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

  faSearch = faSearch ;
  colonnes: string[] = ["infosAd","options"];
  datasource = new MatTableDataSource<Advertisement>(DATA_TEST) ;
  roleUser: string | undefined ;
  idUser: number | undefined ;

  constructor(private service:MessageService,private toastr: ToastrService,private authserv:AuthService) { } // recherche ads = filtre dans la liste des ads à afficher

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {

    this.paginator._intl.itemsPerPageLabel = "Ads per page :";
    this.datasource.paginator = this.paginator ;
    this.idUser = this.authserv.userID;
    this.roleUser = this.authserv.role ;
    // this.roleUser = "admin";

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
      console.log("delete ad "+idAd) ;
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
