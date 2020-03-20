import { About } from 'src/model/about';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { AboutDialogComponent } from '../about-dialog/AboutDialogComponent';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {

  aboutItems: About[];
  aboutImages: any[];
  loading = false;
  showMessage = false;
  message;
  responseError;
  aboutId;
  
  constructor(
    public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.getAboutImages();
    this.getAboutItems();

  }

  private getAboutImages() {
    this.mongoAgencyWebSiteService.getListing('about/images')
      .subscribe(data => {
        // property services comes to the endpoint
        // tslint:disable-next-line: no-string-literal
        this.aboutImages = data['aboutImages'];
      }, err => {
        this.showMessage = true;
        this.message = err;
      });
  }

  private getAboutItems() {
    this.mongoAgencyWebSiteService.getListing('about')
      .subscribe(data => {
        // property services comes to the endpoint
        // tslint:disable-next-line: no-string-literal
        this.aboutItems = data['abouts'];
      }, err => {
        this.showMessage = true;
        this.message = err;
      });
  }

  viewDetails(value: any) {
    this.router.navigate(['/about-view/' + value]);
  }

  openDialog(aboutId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { aboutId };
    this.aboutId = aboutId;
    const dialogRef = this.dialog.open(AboutDialogComponent, dialogConfig);
    this.setSrcImageForTheUpdatedItem(dialogRef);

  }

  private setSrcImageForTheUpdatedItem(dialogRef) {

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        const elementId = 'img_' + this.aboutId;
        (window.document.getElementById(elementId) as HTMLImageElement).src = data.cloudImage;
      }
    });

  }

  deleteItem(documentId: any, index) {
    if (confirm('Are you sure you want do delete this item?')) {
      this.loading = true;
      const deleteOptions = {
        id: documentId
      };
      this.promiseToDelete(deleteOptions).then(() => {
        if (this.responseError === 'false') {
          this.deleteRow(index);
        }
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 1500);
      });
    }
  }

  deleteRow(index) {
    this.aboutItems.splice(index, 1);
  }

  promiseToDelete(deleteOptions: any) {

    return new Promise((onResolve, onReject) => {
      this.mongoAgencyWebSiteService.delete('about', deleteOptions)
        .toPromise()
        .then(
          response => {
            this.loading = false;
            this.showMessage = true;
            this.message = response.message;
            this.responseError = response.error;
            console.log(response.message);
            onResolve();
          },
          message => {
            onReject(message);
          }
        ).catch(function (err) {
          console.error(err);
        });

    });

  }

}
