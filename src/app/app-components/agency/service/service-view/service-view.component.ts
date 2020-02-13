import { ArrayList } from './../../../../lib/util/ArrayList';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { Service } from 'src/model/service';
import { Router, Resolve } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent implements OnInit {

  serviceItems: Service[];
  loading = false;
  showMessage = false;
  message;

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
    this.loading = true;
    const deleteOptions = {
      id: documentId
    };
    this.promiseToDelete(deleteOptions).then(() => console.log('Task Complete!'));
  }

  promiseToDelete(deleteOptions: any) {

    return new Promise((resolve, reject) => {
      this.mongoAgencyWebSiteService.delete('service', deleteOptions)
        .toPromise()
        .then(
          response => {
            this.loading = false;
            this.showMessage = true;
            this.message = response.message;
            console.log(response.message);
            resolve();
          },
          message => {
            reject(message);
          }
        );

    });

  }
}
