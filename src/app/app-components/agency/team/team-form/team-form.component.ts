import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  public documentForm: FormGroup;
  teamMemberData: any;
  isNew = true;
  loading = false;
  message = 'Please provide data';
  showMessage = false;
  email: string;

  validationMessages = {
    email: [
      { type: 'required', message: 'E-mail is required.' }
    ],
    name: [
      { type: 'required', message: 'name is required.' }
    ],
    role: [
      { type: 'required', message: 'role is required.' }
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
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.subscribeData();
  }

  onSubmit(value) {
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

      const teamMemberData = routeData.teamMember[0].members[0];
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
      email: value.email,
      name: value.name,
      role: value.role,
      twitter: value.twitter,
      facebook: value.facebook,
      linkedin: value.linkedin
    };

    this.mongoAgencyWebSiteService.insert('about', insertOptions)
      .subscribe(data => {
        this.showMessage = true;
        this.message = data.message + ' Redirecting to the team members listing...';
        setTimeout(() => {
          this.router.navigate(['team-members-view']);
        }, 2000);  // 2s

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
        this.showMessage = true;
        this.message = data.message + ' Redirecting to the team member listing...';
        setTimeout(() => {
          this.router.navigate(['team-members-view']);
        }, 2000);  // 2s

      }, err => {
        console.log(err);
      });

  }

  delete(documentId: any) {
    if (confirm('Are you sure you want do delete this item?')) {
      this.loading = true;
      const deleteOptions = {
        id: documentId
      };
      this.promiseToDelete(deleteOptions).then(() => {
        this.showMessage = true;
        this.message = this.message + ' Redirecting to the about listing...';
        setTimeout(() => {
          this.router.navigate(['team-members-view']);
        }, 2000);  // 2s
      });
    }
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
            console.log(response.message);
            onResolve();
          },
          message => {
            onReject(message);
          }
        ).catch(function (err) {
          alert(err);
          console.error(err);
        });

    });

  }

  cancel() {
    this.router.navigate(['/team-members-view']);
  }
}
