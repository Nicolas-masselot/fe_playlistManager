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
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

export interface Utilisateur{
  idUser:number,
  email:string,
  role:string,
  nbplaylist:number | undefined,
  nbads:number |undefined
}

export interface NouvUser{
  email:string,
  mdp:string,
  mdpConfirm:string
  role:string
}

export interface UserEdited{
  user:number,
  email:string,
  changed:boolean
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
  users : Utilisateur[] = DATA_TEST;
  datasource = new MatTableDataSource<Utilisateur>(this.users) ;

  constructor(private service:MessageService,private toastr: ToastrService,private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Users per page :"
    this.datasource.paginator = this.paginator ;
    this.service.sendMessage('recupAllUsers',{}).subscribe(
      (response)=>{
        this.users = response.data ;
      },
      (error) => {
        this.toastr.error("An error has occured");
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
      let indexUserTarget = this.datasource.data.findIndex(utilisateur => utilisateur.idUser == idUser);
      const dialogRef = this.dialog.open(UserDialogComponent,{
        data: {
          dialogType : "editUser",
          userId: idUser,
          mail: this.users[indexUserTarget].email
        }
      });
      dialogRef.afterClosed().subscribe((editedUser:UserEdited)=>{
        if (editedUser.changed) {
          this.blockUI.start('Loading...');
          this.service.sendMessage('editUser',{userId: idUser , mail: editedUser.email }).subscribe(
            (response)=>{
              this.toastr.success("User profile edited successfully");
              let indexEdit = this.datasource.data.findIndex(utilisateur => utilisateur.idUser == idUser);
              this.users[indexEdit].email = editedUser.email ;
              this.datasource.data = this.users ;
              console.log(response);
              this.blockUI.stop();
            },
            (error)=>{
              this.toastr.error("An error has occured");
              console.log(error) ;
              this.blockUI.stop();
            }
          )
        }
      });
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
              let index_todel = this.datasource.data.findIndex(utilisateur => utilisateur.idUser == idUser);
              this.users.splice(index_todel,1);
              this.datasource.data = this.users ;
              console.log(response);
              this.blockUI.stop();
            },
            (error) => {
              this.toastr.error("An error has occured while deleting User");
              console.log(error) ;
              this.blockUI.stop();
            }
          );
        }
      });
    }
  }

  OpenAddUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent,{
      data: {
        dialogType : "addUser"
      }
    });
    dialogRef.afterClosed().subscribe((newUser: NouvUser)=>{
      if (newUser.email && newUser.mdp && newUser.mdpConfirm && newUser.role) {
        this.blockUI.start('Loading...');
        this.service.sendMessage('addUser',newUser).subscribe(
          (response)=>{
            this.toastr.success('User added successfully'); 
            if (newUser.role === "User") {
              let nouvelUtilisateur = {idUser: response.data.id, email: newUser.email,role: newUser.role, nbplaylist:0, nbads:undefined} ;
              this.users.push(nouvelUtilisateur) ;
            } else {
              let nouvelUtilisateur = {idUser: response.data.id, email: newUser.email,role: newUser.role, nbplaylist:undefined, nbads:0} ;
              this.users.push(nouvelUtilisateur) ;
            }
            this.datasource.data = this.users ;
            console.log(response);
            this.blockUI.stop();
          },
          (error) => {
            this.toastr.error("An error has occured while Adding the User");
            console.log(error) ;
            this.blockUI.stop();
          }
        )
      }
    });
  }
}

const DATA_TEST: Utilisateur[] = [
  {idUser: 420, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 421, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 422, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 423, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 424, email: "mail@test3.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 425, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 426, email: "mail@test3.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 427, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 428, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 429, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 430, email: "mail@test4.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 431, email: "mail@test4.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 432, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 433, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 434, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 435, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 436, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 437, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 438, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 439, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 440, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 420, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 441, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 442, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 443, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 444, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 445, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 446, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 447, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 448, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 449, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 450, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 451, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 452, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 453, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 454, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69},
  {idUser: 455, email: "mail@test.com",role: "User", nbplaylist:69, nbads:undefined},
  {idUser: 456, email: "mail@test2.com",role: "Advertiser", nbplaylist:undefined, nbads:69}
]