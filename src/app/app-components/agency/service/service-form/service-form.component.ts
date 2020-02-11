import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MongoAgencyWebSiteService } from 'src/app/app-services/db/mongo/MongoAgencyWebSiteService.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  public serviceForm: FormGroup;
  serviceData: any;
  isNew = true;

  validationMessages = {
    title: [
      { type: 'required', message: 'Title is required.' }
    ],
    description: [
      { type: 'required', message: 'Description is required.' }
    ]
  };

  onSubmit(value) {
    if (this.isNew) {
      this.insert(value);
    } else {
      this.update(value);
    }
  }

  insert(value: any) {
    throw new Error('Method not implemented.');
  }

  update(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    public mongoAgencyWebSiteService: MongoAgencyWebSiteService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  createForm() {
    this.serviceForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  cancel() {
    this.router.navigate(['/service-view']);
  }

  ngOnInit() {
    this.subscribePortfolioData();

  }

  createFormWithData() {
    this.serviceForm = this.formBuilder.group({
      title: [this.serviceData.service.title, Validators.required],
      description: [this.serviceData.service.description, Validators.required],
    });
  }

  private subscribePortfolioData() {
    this.route.data.subscribe(routeData => {
      const serviceData = routeData;
      if (serviceData) {
        this.isNew = false;
        this.serviceData = serviceData;
        this.serviceData.id = serviceData.service.id;
        this.createFormWithData();
      } else {
        this.isNew = true;
        this.createForm();
      }
    });
  }
}