import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseAgencyWebSiteService } from '../../../../app-services/db/firebase/FirebaseAgencyWebSiteService.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DeleteMsgComponent } from '../../../admin-layout/modals/delete-msg/delete-msg.component';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class PortfolioFormComponent implements OnInit {
  modalRef: BsModalRef;
  public portfolioForm: FormGroup;
  portfolioData: any;
  isNew = true;

  validationMessages = {
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    desc: [
      { type: 'required', message: 'Description is required.' }
    ],
    price: [
      { type: 'required', message: 'Price is required.' },
    ],
    availableDate: [
      { type: 'required', message: 'Date is required.' },
    ]
  };

  constructor(
    private modalService: BsModalService,
    public firebaseAgencyService: FirebaseAgencyWebSiteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
    this.portfolioForm = this.formBuilder.group({
      name: ['', Validators.required ],
      desc: ['', Validators.required ],
      price: ['', Validators.required ],
      availableDate: ['', Validators.required ],
    });
  }

  private createFormWithData() {
    this.portfolioForm = this.formBuilder.group({
      name: [this.portfolioData.name, Validators.required],
      desc: [this.portfolioData.desc, Validators.required],
      price: [this.portfolioData.price, Validators.required],
      availableDate: [this.portfolioData.availableDate, Validators.required],
    });
  }

  private subscribeData() {
    this.route.data.subscribe(routeData => {
      const portfolioData = routeData.portfolio;
      if (portfolioData) {
       this.isNew = false;
       this.portfolioData = portfolioData.payload.data();
       this.portfolioData.id = portfolioData.payload.id;
       this.createFormWithData();
      } else {
        this.isNew = true;
        this.createForm();
      }
    });
  }

  private insert(value: any) {
    if (value) {
      value.price = Number(value.price);
      this.firebaseAgencyService.insert('portfolio', value)
        .then(res => {
          this.router.navigate(['/portfolio-view']);
        });
    }
  }

  private update(value: any) {
    value.price = Number(value.price);
    this.firebaseAgencyService.update('portfolio', this.portfolioData.id, value)
      .then(res => {
        this.router.navigate(['/portfolio-view']);
      });
  }

  private delete() {
    this.modalRef = this.modalService.show(DeleteMsgComponent, {
      initialState: {
        modalMainMessage: 'Are you sure you want to delete this item?',
        modalSecondaryMessage: 'Details',
        collectionId: this.portfolioData.id,
        collectionName: 'portfolio',
        data: {}
      }
    });
  }

  private cancel() {
    this.router.navigate(['/portfolio-view']);
  }
}
