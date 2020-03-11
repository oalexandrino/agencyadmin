import { TeamMember } from '../../../../../model/teamMember';
import { TeamImage } from '../../../../../model/teamImage';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { UploadService } from 'src/app/app-services/db/upload/upload-service.service';
import { Router } from '@angular/router';

const endpointUpload = 'http://localhost:3000/api/team/image/';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent implements OnInit {

  fileToUpload: File = null;
  teamForm: FormGroup;
  teamImageItem: TeamImage;
  teamMember: TeamMember;
  email: string;
  imageLoaded: boolean;
  teamMemberName: string;
  teamMemberRole: string;
  teamImageId: string;
  uploadResult: any;
  errorMessage;
  showError: boolean;


  constructor(
    private router: Router,
    public fileUploadService: UploadService,
    private formBuilder: FormBuilder,
    public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
    private dialogRef: MatDialogRef<TeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { email }) {
    this.teamForm = this.formBuilder.group({ email: [''] });
    this.email = email;
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
          this.router.navigate(['/team-view']);
        }, error => {
          this.showError = true;
          this.errorMessage = error;
          console.log(error);
        });
    }
  }

  private addFormData() {
    const formData: FormData = new FormData();
    formData.append('email', this.teamMember.email);
    formData.append('imageName', this.teamMember.name);
    formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
    return formData;
  }

  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private getTeamMemberImage() {
    return new Promise((resolve, reject) => {
      this.mongoAgencyWebSiteService.getCollectionItem('team/image', this.email)
        .subscribe(data => {
          console.log(data);
          this.teamImageItem = data;
          this.imageLoaded = true;
          this.getTeamMemberItem();
          resolve(data);
        }, err => { console.log(err); });
    });
  }

  private getTeamMemberItem() {
    return new Promise((resolve, reject) => {
      this.mongoAgencyWebSiteService.getCollectionItem('team', this.email)
        .subscribe(data => {
          console.log(data);
          this.bindTeamMemberItemData(data);
          resolve(data);
        }, err => { console.log(err); });
    });
  }

  private bindTeamMemberItemData(data: any) {
    this.teamMember = data;
    this.teamMemberName = this.teamMember.name;
    this.teamMemberRole = this.teamMember.role;
    this.teamImageId = this.teamImageItem.imageId;
  }

  public close() {
    this.dialogRef.close(this.uploadResult);
  }

  ngOnInit() {
    this.getTeamMemberImage();
  }

}
