import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-ads',
  templateUrl: './manage-ads.component.html',
  styleUrls: ['./manage-ads.component.scss']
})
export class ManageAdsComponent implements OnInit {

  constructor() { } // recherche ads = filtre dans la liste des ads à afficher

  ngOnInit(): void {
  }

}
