import { ArrayList } from './../../../../lib/util/ArrayList';
import { Component, OnInit } from '@angular/core';
import { MatList } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { Service } from 'src/model/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent implements OnInit {

  serviceItems: Service[];
  isLoadingResults = true;

  constructor( public mongoAgencyWebSiteService: MongoAgencyWebSiteService) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.mongoAgencyWebSiteService.getListing('/service/')
      .subscribe(data => {

        // property services comes to the endpoint
        // tslint:disable-next-line: no-string-literal
        this.serviceItems = data['services'];
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  edit(value: any) {
    alert(value);
  }


}
