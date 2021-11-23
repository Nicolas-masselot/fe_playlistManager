import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  CreateAccountControl = new FormGroup({
    email : new FormControl('mailUser',Validators.required),
    password: new FormControl('mdpUser', Validators.required),
    passconfirm: new FormControl('mdpConfirm', Validators.required)
  });
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitAccountCreation(): void {
    console.log("ok");
  }

}
