import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { ProgressSpinnerComponent } from 'src/app/app-components/admin-layout/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  public documentForm: FormGroup;
  teamMemberData: any;
  isNew = true;
  email: string;
  spinnerData = {
    loading: false,
    message: 'Please provide data',
    showMessage: false,
    timeoutInterval: 1500
  };

  validationMessages = {
    email: [
      { type: 'required', message: 'E-mail is required.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    role: [
      { type: 'required', message: 'Role is required.' }
    ]
    ,
    twitter: [
      { type: 'required', message: 'Twitter is required.' }
    ]
    ,
    facebook: [
      { type: 'required', message: 'Facebook is required.' }
    ]
    ,
    linkedin: [
      { type: 'required', message: 'Linkedin is required.' }
    ]
  };

  constructor(
    public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private progressSpinnerComponent: ProgressSpinnerComponent,
  ) {

  }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.subscribeData();
  }

  onSubmit(value) {
    this.spinnerData.loading = true;
    if (this.isNew) {
      this.insert(value);
    } else {
      this.update(value);
    }
  }

  private createForm() {
    this.documentForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required],
      twitter: ['', Validators.required],
      facebook: ['', Validators.required],
      linkedin: ['', Validators.required],

    });
  }

  private createFormWithData() {
    this.documentForm = this.formBuilder.group({
      email: [this.teamMemberData.email, Validators.required],
      name: [this.teamMemberData.name, Validators.required],
      role: [this.teamMemberData.role, Validators.required],
      twitter: [this.teamMemberData.twitter, Validators.required],
      facebook: [this.teamMemberData.facebook, Validators.required],
      linkedin: [this.teamMemberData.linkedin, Validators.required],
    });
  }

  private subscribeData() {
    this.route.data.subscribe(routeData => {
      let teamMemberData;
      if (routeData.teamMember) {
        teamMemberData = routeData.teamMember[0].members[0];
      }
      if (teamMemberData) {
        this.isNew = false;
        this.teamMemberData = teamMemberData;
        this.teamMemberData.id = teamMemberData.id;
        this.createFormWithData();
      } else {
        this.isNew = true;
        this.createForm();
      }
    });
  }

  private insert(value: any) {

    const insertOptions = {
      id: value.email,
      email: value.email,
      name: value.name,
      role: value.role,
      twitter: value.twitter,
      facebook: value.facebook,
      linkedin: value.linkedin
    };

    this.mongoAgencyWebSiteService.insert('/team/members/', insertOptions)
      .subscribe(data => {
        this.spinnerData.showMessage = true;
        if (data.memberFound) {
          this.spinnerData.message = data.message;
          this.progressSpinnerComponent.resetStatus(this.spinnerData);
        } else {
          this.spinnerData.message = data.message + ' Redirecting to the team members listing...';
          this.progressSpinnerComponent.resetStatus(this.spinnerData, this.router, 'team-members-view');
        }
      }, err => {
        console.log(err);
      });
  }

  private update(value: any) {

    const updateOptions = {
      id: this.teamMemberData.email,
      email: this.teamMemberData.email,
      name: value.name,
      role: value.role,
      twitter: value.twitter,
      facebook: value.facebook,
      linkedin: value.linkedin,
    };
    this.mongoAgencyWebSiteService.update('/team/members/', updateOptions)
      .subscribe(data => {
        this.spinnerData.message = data.message + ' Redirecting to the team members listing...';
        this.spinnerData.showMessage = true;
        this.progressSpinnerComponent.resetStatus(this.spinnerData, this.router, 'team-members-view');
      }, err => {
        console.log(err);
      });
  }

  delete(email: any) {
    if (confirm('Are you sure you want do delete this member?')) {
      this.spinnerData.loading = true;
      const deleteOptions = { id: email };
      this.promiseToDelete(deleteOptions).then(() => {
        this.spinnerData.message += ' Redirecting to the team member listing...';
        this.spinnerData.showMessage = true;
        this.progressSpinnerComponent.resetStatus(this.spinnerData, this.router, 'team-members-view');
      });
    }
  }

  promiseToDelete(deleteOptions: any) {
    return new Promise((onResolve, onReject) => {
      this.mongoAgencyWebSiteService.delete('team/members', deleteOptions)
        .toPromise()
        .then(
          response => {
            this.spinnerData.message = response.message;
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

  cancel() {
    this.router.navigate(['/team-members-view']);
  }
}
