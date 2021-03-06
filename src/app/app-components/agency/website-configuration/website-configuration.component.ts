import { Component, OnInit } from '@angular/core';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressSpinnerComponent } from '../../admin-layout/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-website-configuration',
  templateUrl: './website-configuration.component.html',
  styleUrls: ['./website-configuration.component.scss']
})
export class WebsiteConfigComponent implements OnInit {

  public documentForm: FormGroup;
  webSiteData: any;
  spinnerData = {
    loading: false,
    message: 'Please provide data',
    showMessage: false,
    timeoutInterval: 1500
  };

  validationMessages = {
    site_title: [
      { type: 'required', message: 'Site title is required.' }
    ],
    site_headline: [
      { type: 'required', message: 'Site headline is required.' }
    ],
    link_site: [
      { type: 'required', message: 'Link site is required.' }
    ],
    service_headline: [
      { type: 'required', message: 'Service headline is required.' }
    ],
    portfolio_headline: [
      { type: 'required', message: 'Portfolio headline is required.' }
    ],
    about_headline: [
      { type: 'required', message: 'About headline is required.' }
    ],
    contact_headline: [
      { type: 'required', message: 'Contact headline is required.' }
    ],
  };

  constructor(
    public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private progressSpinner: ProgressSpinnerComponent,
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
      site_title: value.site_title,
      site_headline: value.site_headline,
      link_site: value.link_site,
      service_headline: value.service_headline,
      portfolio_headline: value.portfolio_headline,
      about_headline: value.about_headline,
      contact_headline: value.contact_headline
    };

    this.mongoAgencyWebSiteService.update('/config/', updateOptions)
      .subscribe(data => {
        this.spinnerData.message = data.message;
        this.spinnerData.showMessage = true;
        this.progressSpinner.resetStatus(this.spinnerData);
      }, err => {
        console.log(err);
      });
  }

  private createForm() {
    this.documentForm = this.formBuilder.group({
      site_title: ['', Validators.required],
      site_headline: ['', Validators.required],
      link_site: ['', Validators.required],
      service_headline: ['', Validators.required],
      portfolio_headline: ['', Validators.required],
      about_headline: ['', Validators.required],
      contact_headline: ['', Validators.required],
    });
  }

  private createFormWithData() {
    this.documentForm = this.formBuilder.group({
      site_title: [this.webSiteData.site_title, Validators.required],
      site_headline: [this.webSiteData.site_headline, Validators.required],
      link_site: [this.webSiteData.link_site, Validators.required],
      service_headline: [this.webSiteData.service_headline, Validators.required],
      portfolio_headline: [this.webSiteData.portfolio_headline, Validators.required],
      about_headline: [this.webSiteData.about_headline, Validators.required],
      contact_headline: [this.webSiteData.contact_headline, Validators.required],
    });
  }

  private subscribeData() {
    this.route.data.subscribe(routeData => {

      let webSiteData;

      if (routeData) {
        webSiteData = routeData.webSiteConfigData.config[0];
      }

      if (webSiteData) {

        this.webSiteData = webSiteData;
        this.webSiteData.id = webSiteData.id;
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
