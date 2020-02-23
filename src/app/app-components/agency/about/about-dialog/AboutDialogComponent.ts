import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { AboutImage } from 'src/model/aboutImage';
import { About } from 'src/model/about';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'course-dialog',
    templateUrl: './about-dialog-content.html',
})
export class AboutDialogComponent implements OnInit {

    form: FormGroup;
    aboutImageItem: AboutImage;
    aboutItem: About;
    aboutId: string;
    imageLoaded: boolean;
    aboutItemTitle: string;

    constructor(
        public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
        private dialogRef: MatDialogRef<AboutDialogComponent>,
        @Inject(MAT_DIALOG_DATA) { aboutId }) {
        this.aboutId = aboutId;
        this.imageLoaded = false;
    }

    private getAboutImage() {
        return new Promise((resolve, reject) => {
            this.mongoAgencyWebSiteService.getCollectionItem('about/image', this.aboutId)
                .subscribe(data => {
                    console.log(data);
                    this.aboutImageItem = data;
                    this.imageLoaded = true;
                    this.getAboutItem();
                    resolve(data);
                }, err => { console.log(err); });
        });
    }

    private getAboutItem() {
        return new Promise((resolve, reject) => {
            this.mongoAgencyWebSiteService.getCollectionItem('about', this.aboutId)
                .subscribe(data => {
                    console.log(data);
                    this.aboutItem = data;
                    this.aboutItemTitle = this.aboutItem.headline;
                    resolve(data);
                }, err => { console.log(err); });
        });
    }


    ngOnInit() {
        this.getAboutImage();
    }


    close() {
        this.dialogRef.close();
    }

}
