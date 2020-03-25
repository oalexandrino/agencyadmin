import { Component, OnInit } from '@angular/core';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressSpinnerComponent } from '../../admin-layout/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  public documentForm: FormGroup;
  teamInfoData: any;

  spinnerData = {
    loading: false,
    message: 'Please provide data',
    showMessage: false,
    timeoutInterval: 1500
  };

  validationMessages = {
    description: [
      { type: 'required', message: 'Description is required.' }
    ],
    headline: [
      { type: 'required', message: 'Headline is required.' }
    ],
    title: [
      { type: 'required', message: 'Title is required.' }
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
    this.subscribeData();
  }

  onSubmit(value) {
    this.spinnerData.loading = true;
    this.update(value);
  }

  private update(value: any) {

    const updateOptions = {
      description: value.description,
      headline: value.headline,
      title: value.title,
    };

    this.mongoAgencyWebSiteService.update('/team/', updateOptions)
      .subscribe(data => {
        this.spinnerData.message = data.message;
        this.spinnerData.showMessage = true;
        this.progressSpinnerComponent.resetStatus(this.spinnerData);
      }, err => {
        console.log(err);
      });
  }

  private createForm() {
    this.documentForm = this.formBuilder.group({
      description: ['', Validators.required],
      headline: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  private createFormWithData() {
    this.documentForm = this.formBuilder.group({
      description: [this.teamInfoData.description, Validators.required],
      headline: [this.teamInfoData.headline, Validators.required],
      title: [this.teamInfoData.title, Validators.required],
    });
  }

  private subscribeData() {
    this.route.data.subscribe(routeData => {

      let teamInfoData;

      if (routeData) {
        teamInfoData = routeData.teamInfoData[0];
      }

      if (teamInfoData) {

        this.teamInfoData = teamInfoData;
        this.teamInfoData.id = teamInfoData.id;
        this.createFormWithData();
      } else {

        this.createForm();
      }
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
