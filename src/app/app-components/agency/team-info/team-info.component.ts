import { Component, OnInit } from '@angular/core';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  public documentForm: FormGroup;
  teamInfoData: any;
  message = 'Please provide data';
  showMessage = false;
  spinnerloading = false;

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
  ) {

  }

  ngOnInit() {
    this.subscribeData();
  }

  onSubmit(value) {
    this.spinnerloading = true;
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
        this.showMessage = true;
        this.message = data.message;
        setTimeout(() => {
          this.showMessage = false;
          this.spinnerloading = false;
        }, 1500);  // 2s
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
