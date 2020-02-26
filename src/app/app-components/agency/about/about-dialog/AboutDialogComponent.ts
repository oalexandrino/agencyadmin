import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    uploadResult: any;


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

    public upload() {
        if (!this.fileToUpload) {
            alert('Please select a file before uploading.');
        } else {

            const formData: FormData = this.addFormData();

            this.fileUploadService.postFile(formData, endpointUpload)
                .subscribe(data => {
                    alert(data.message);
                    this.uploadResult = data;
                    this.close();
                    this.router.navigate(['/about-view']);
                }, error => {
                    console.log(error);
                });
        }
    }

    private addFormData() {
        const formData: FormData = new FormData();
        formData.append('aboutId', this.aboutItem._id);
        formData.append('imageName', this.aboutItem.headline);
        formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
        return formData;
    }

    public handleFileInput(files: FileList) {
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

    public close() {
        this.dialogRef.close( this.uploadResult );
    }

    ngOnInit() {
        this.getAboutImage();
    }

}
