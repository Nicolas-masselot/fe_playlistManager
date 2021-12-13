import { Component, Inject, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ads-dialog',
  templateUrl: './ads-dialog.component.html',
  styleUrls: ['./ads-dialog.component.scss']
})
export class AdsDialogComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  dialogType = "addAdvert";
  adName:string = "";
  AdvertID:number | undefined ;
  titleMessage:string = "Add new Advertisement";
  SavebuttonText:string = "Save changes" ;
  advertiserMail:string = "";
  accountRole:string = "admin";
  nameRequired:boolean = false ;
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any
  ,private dialogRef: MatDialogRef<AdsDialogComponent>
  ,private service:MessageService, private authServ:AuthService ) { 
    this.dialogType = data.dialogType ;
    if (data.AdvertID) {
      this.AdvertID = data.AdvertID ;
    }

    if (data.advertiserMail) {
      this.advertiserMail = data.advertiserMail ;
    }

    if (data.adName) {
      this.adName = data.adName
    }

    if ( this.dialogType === 'editAds' ) {
      this.titleMessage = "Edit advertisement";
      this.SavebuttonText = "Save changes";
    } else {
      this.titleMessage = "Add a new advertisement";
      this.SavebuttonText = "Add the advertisement" ;
    }

    //this.accountRole = authServ.role ;
  }

  ngOnInit(): void {
  }

  uploadAd():void{
    console.log("upload ad coming soon");
  }

  OnSaveData():void {
    let NameAdForm = new FormControl(this.adName,[
      Validators.required
    ]);

    if (NameAdForm.errors != null) {
      this.nameRequired = true ;
    } else {
      this.nameRequired = false ;
    }

    if (!this.nameRequired && this.dialogType === 'editAds') {
      this.dialogRef.close({idAd:this.AdvertID,nameAdd:this.adName, changed:true});
    } else if (!this.nameRequired && this.dialogType=== 'addAdvert') {
      this.dialogRef.close({adName:this.adName});
    }
  }
}
