import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/lib/util/format-datepicker';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AboutFormComponent implements OnInit {

  public documentForm: FormGroup;
  aboutData: any;
  isNew = true;
  loading = false;
  message = 'Please provide data';
  showMessage = false;
  id: string;

  validationMessages = {
    headline: [
      { type: 'required', message: 'Headline is required.' }
    ],
    description: [
      { type: 'required', message: 'Description is required.' }
    ]
    ,
    date: [
      { type: 'required', message: 'Font awesome Icon is required.' }
    ]
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
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
      headline: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  private createFormWithData() {
    this.documentForm = this.formBuilder.group({
      headline: [this.aboutData.headline, Validators.required],
      description: [this.aboutData.description, Validators.required],
      date: [this.aboutData.date, Validators.required],
    });
  }

  private subscribeData() {
    this.route.data.subscribe(routeData => {
      const aboutData = routeData.about;
      if (aboutData) {
        this.isNew = false;
        this.aboutData = aboutData;
        this.aboutData.id = aboutData.id;
        this.createFormWithData();
      } else {
        this.isNew = true;
        this.createForm();
      }
    });
  }

  private insert(value: any) {

    const insertOptions = {
      headline: value.headline,
      description: value.description,
      date: value.date
    };

    this.mongoAgencyWebSiteService.insert('about', insertOptions)
      .subscribe(data => {
        this.showMessage = true;
        this.message = data.message + ' Redirecting to the about listing...';
        setTimeout(() => {
          this.router.navigate(['about-view']);
        }, 2000);  // 2s

      }, err => {
        console.log(err);
      });
  }

  private update(value: any) {

    const updateOptions = {
      id: this.aboutData._id,
      headline: value.headline,
      description: value.description,
      date: value.date
    };

    this.mongoAgencyWebSiteService.update('about', updateOptions)
      .subscribe(data => {
        this.showMessage = true;
        this.message = data.message + ' Redirecting to the about listing...';
        setTimeout(() => {
          this.router.navigate(['about-view']);
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
          this.router.navigate(['about-view']);
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
    this.router.navigate(['/about-view']);
  }
}
