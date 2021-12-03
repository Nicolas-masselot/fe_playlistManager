import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MessageService } from '../services/message.service';
import {ToastrService} from "ngx-toastr";
import { CustomPaginator } from '../customPaginator';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
  
  @BlockUI() blockUI!: NgBlockUI;
  faSearch = faSearch ;
  colonnes: string[] = ["infosUser","ItemsUser","options"];
  datasource = new MatTableDataSource<Utilisateur>(DATA_TEST) ;

  constructor(private service:MessageService,private toastr: ToastrService,private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Users per page :"
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

  filtrerUsers(event:Event){
    const nomUser = (event.target as HTMLInputElement).value;
    this.datasource.filter = nomUser.trim().toLowerCase() ;
  }

  openDialogUser(idUser:number,typeDialog:number){
    if (typeDialog == 1) {
      console.log("modifs pour user"+idUser)
    } else {
      const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent,{
        data : {
          message: "Once you delete this account, there is no going back. Please be certain.",
          buttonText: {
            deleteconfirmed: "Delete Account",
            canceldelete: "Cancel"
          }
        }
      });

      dialogRef.afterClosed().subscribe((confirmedDelete:boolean) => {
        if (confirmedDelete) {
          this.blockUI.start('Loading...');
          this.service.sendMessage('deleteUser',{idUtilisateur: idUser}).subscribe(
            (response)=>{
              this.toastr.success("User deleted successfully");
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

const DATA_TEST: Utilisateur[] = [
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test3.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test3.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 420, email: "mail@test4.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test4.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
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