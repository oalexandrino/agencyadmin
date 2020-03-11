import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { Router } from '@angular/router';
import { TeamDialogComponent } from '../team-dialog/team-dialog.component';
import { TeamMember } from 'src/model/teamMember';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {

  teamMembers: TeamMember[];
  teamMembersImages: any[];
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
    this.getTeamMembersImages();
    this.getTeamMembers();

  }

  private getTeamMembersImages() {
    this.mongoAgencyWebSiteService.getListing('team/image')
      .subscribe(data => {
        // property services comes to the endpoint
        // tslint:disable-next-line: no-string-literal
        this.teamMembersImages = data['teamMemberImages'];
      }, err => {
        this.showMessage = true;
        this.message = err;
      });
  }

  private getTeamMembers() {
    this.mongoAgencyWebSiteService.getListing('team/members')
      .subscribe(data => {
        // property services comes to the endpoint
        // tslint:disable-next-line: no-string-literal
        this.teamMembers = data['team'][0]['members'];
        console.log(this.teamMembers);
      }, err => {
        this.showMessage = true;
        this.message = err;
      });
  }

  viewDetails(value: any) {
    this.router.navigate(['/team-view/' + value]);
  }

  openDialog(email) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { email };
    const dialogRef = this.dialog.open(TeamDialogComponent, dialogConfig);
    this.setSrcImageForTheUpdatedItem(dialogRef);

  }

  private setSrcImageForTheUpdatedItem(dialogRef) {

    dialogRef.afterClosed().subscribe(data => {
      const elementId = 'img_' + data.teamEmail;
      (window.document.getElementById(elementId) as HTMLImageElement).src = data.cloudImage;
    });

  }

  deleteItem(documentId: any) {
    if (confirm('Are you sure you want to remove this member?')) {
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
    const index = this.teamMembers.indexOf(d);
    this.teamMembers.splice(index, 1);
  }

  promiseToDelete(deleteOptions: any) {

    return new Promise((onResolve, onReject) => {
      this.mongoAgencyWebSiteService.delete('team', deleteOptions)
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
        ).catch(function (err) {
          console.error(err);
        });

    });

  }

}
