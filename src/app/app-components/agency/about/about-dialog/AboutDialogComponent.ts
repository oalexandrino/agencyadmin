import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { AboutImage } from 'src/model/aboutImage';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'course-dialog',
    templateUrl: './about-dialog-content.html',
})
export class AboutDialogComponent implements OnInit {

    form: FormGroup;
    aboutImageItem: AboutImage;
    aboutId: string;

    constructor(
        public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
        private dialogRef: MatDialogRef<AboutDialogComponent>,
        @Inject(MAT_DIALOG_DATA) { aboutId }) {
        this.aboutId = aboutId;



    }

    ngOnInit() {
        this.mongoAgencyWebSiteService.getCollectionItem('about/image', this.aboutId)
            .subscribe(data => {
                // property services comes to the endpoint
                // tslint:disable-next-line: no-string-literal
                this.aboutImageItem = data;
            }, err => {
                // this.showMessage = true;
                // this.message = err;
            });
    }


    close() {
        this.dialogRef.close();
    }

}
