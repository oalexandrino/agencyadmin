import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { AboutImage } from 'src/model/aboutImage';
import { About } from 'src/model/about';
import { UploadService } from 'src/app/app-services/db/upload/upload-service.service';
import { Router } from '@angular/router';

const endpointUpload = 'http://localhost:3000/api/about/image/';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'course-dialog',
    templateUrl: './about-dialog-content.html',
    styleUrls: ['./about-dialog-content.scss']
})
export class AboutDialogComponent implements OnInit {

    fileToUpload: File = null;
    aboutForm: FormGroup;
    aboutImageItem: AboutImage;
    aboutItem: About;
    aboutId: string;
    imageLoaded: boolean;
    aboutHeadline: string;
    aboutDescription: string;
    aboutImageId: string;


    constructor(
        private router: Router,
        public fileUploadService: UploadService,
        private formBuilder: FormBuilder,
        public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
        private dialogRef: MatDialogRef<AboutDialogComponent>,
        @Inject(MAT_DIALOG_DATA) { aboutId }) {

            this.aboutForm = this.formBuilder.group({ aboutId: [''] });
            this.aboutId = aboutId;
            this.imageLoaded = false;

    }

    private upload() {
        if (!this.fileToUpload) {
            alert('Please select a file before uploading.');
        } else {

            const formData: FormData = new FormData();
            formData.append('aboutId', this.aboutItem._id);
            formData.append('imageName', this.aboutItem.headline);

            this.fileUploadService.postFile(this.fileToUpload, formData, endpointUpload)
                .subscribe(data => {
                    alert(data.message);
                    this.close();
                    this.router.navigate(['/about-view']);
                }, error => {
                    console.log(error);
                });
        }
    }

    private handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
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
                    this.bindAboutItemData(data);
                    resolve(data);
                }, err => { console.log(err); });
        });
    }

    private bindAboutItemData(data: any) {
        this.aboutItem = data;
        this.aboutHeadline = this.aboutItem.headline;
        this.aboutDescription = this.aboutItem.description;
        this.aboutImageId = this.aboutImageItem.imageId;
    }

    private close() {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.getAboutImage();
    }

}
