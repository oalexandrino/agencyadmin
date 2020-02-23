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

  }

  openDialog(aboutId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { aboutId };
    const dialogRef = this.dialog.open(AboutDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => console.log('Dialog output:', val)
    );

  }

  deleteItem(documentId: any) {

  }
}
