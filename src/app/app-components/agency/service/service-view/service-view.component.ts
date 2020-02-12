import { ArrayList } from './../../../../lib/util/ArrayList';
import { Component, OnInit } from '@angular/core';
import { MatList } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { Service } from 'src/model/service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent implements OnInit {

  serviceItems: Service[];

  constructor(
    public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
    private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.mongoAgencyWebSiteService.getListing('service')
      .subscribe(data => {

        // property services comes to the endpoint
        // tslint:disable-next-line: no-string-literal
        this.serviceItems = data['services'];
      }, err => {
        console.log(err);
      });
  }

  viewServiceDetails(value: any) {
    this.router.navigate(['/service-view/' + value]);
  }

  deleteItem(documentId: any) {

    const updateOptions = {
      id: documentId
    };

    this.mongoAgencyWebSiteService.delete('service', updateOptions)
      .subscribe(data => {  }, err => { console.log(err); });

  }



}
