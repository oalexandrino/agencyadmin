import { Component, OnInit } from '@angular/core';
import { MatList } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent implements OnInit {

  constructor( public mongoAgencyWebSiteService: MongoAgencyWebSiteService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    console.log(this.mongoAgencyWebSiteService.getListing("/service/"));
  }

}
