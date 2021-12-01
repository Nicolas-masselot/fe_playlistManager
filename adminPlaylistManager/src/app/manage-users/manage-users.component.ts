import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MessageService } from '../services/message.service';
import {ToastrService} from "ngx-toastr";
import { CustomPaginator } from '../customPaginator';

export interface Utilisateur{
  idUser:number,
  email:string,
  role:string,
  nbplaylist:number | undefined,
  nbads:number |undefined
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() } 
  ]
})
export class ManageUsersComponent implements AfterViewInit {
  
  colonnes: string[] = ["infosUser","ItemsUser","options"];
  datasource = new MatTableDataSource<Utilisateur>(DATA_TEST) ;

  constructor(private service:MessageService,private toastr: ToastrService) { } // recherche users = filtre dans la liste des users à afficher

  @ViewChild(MatPaginator)
paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Clients per page :"
    this.datasource.paginator = this.paginator ;
    this.service.sendMessage('recupAllUsers',{}).subscribe(
      (response)=>{
        this.datasource.data = response.data ;
      },
      (error) => {
        this.toastr.error("Une erreur s'est produite");
        console.log(error) ;
      }
    );
  }

  filtrerUsers(nomUser:string){
    nomUser = nomUser.trim();
    nomUser = nomUser.toLowerCase() ;
    this.datasource.filter = nomUser ;
  }

  openDialogUser(idUser:number,typeDialog:number){
    if (typeDialog == 1) {
      console.log("modifs pour user"+idUser)
    } else {
      console.log("delete User"+idUser) ;
    }
  }
}

const DATA_TEST: Utilisateur[] = [
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69}
]