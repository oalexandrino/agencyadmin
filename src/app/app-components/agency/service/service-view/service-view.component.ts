import { Component, OnInit } from '@angular/core';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { Service } from 'src/model/service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

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
      .subscribe(
        data => {
        // property services comes to the endpoint
        // tslint:disable-next-line: no-string-literal
        this.serviceItems = data['services'];
      }, err => {
          this.showMessage = true;
          this.message = err;
      });
  }

  viewDetails(value: any) {
    this.router.navigate(['/service-view/' + value]);
  }

  deleteItem(documentId: any) {
    if (confirm('Are you sure you want do delete this item?')) {
      this.loading = true;
      const deleteOptions = {
        id: documentId
      };
      this.promiseToDelete(deleteOptions).then(() => {
        this.deleteRow(documentId);
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 1500);
      });
    }
  }

  deleteRow(d) {
    const index = this.serviceItems.indexOf(d);
    this.serviceItems.splice(index, 1);
  }

  promiseToDelete(deleteOptions: any) {

    return new Promise((onResolve, onReject) => {
      this.mongoAgencyWebSiteService.delete('service', deleteOptions)
        .toPromise()
        .then(
          response => {
            this.loading = false;
            this.showMessage = true;
            this.message = response.message;
            console.log(response.message);
            onResolve();
          },
          message => {
            onReject(message);
          }
      ).catch(function(err) {
        console.error(err);
      });

    });

  }
}
