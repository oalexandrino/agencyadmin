import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AgencyService } from './../../services/agency.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DeleteMsgComponent } from './../../modals/delete-msg/delete-msg.component';

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
    ]
  };

  constructor(
    private modalService: BsModalService,
    public firebaseAgencyService: AgencyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subscribePortfolioData();
  }


  delete() {

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


  private subscribePortfolioData() {
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

  createForm() {
    this.portfolioForm = this.formBuilder.group({
      name: ['', Validators.required ],
      desc: ['', Validators.required ],
      price: ['', Validators.required ]
    });
  }

  createFormWithData() {
    this.portfolioForm = this.formBuilder.group({
      name: [this.portfolioData.name, Validators.required],
      desc: [this.portfolioData.desc, Validators.required],
      price: [this.portfolioData.price, Validators.required]
    });
  }

  onSubmit(value) {
    if (this.isNew) {
      this.insert(value);
    } else {
      this.update(value);
    }
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

  /*
   delete() {
    if (confirm('Are you sure you want to delete this item?')) {
      this.firebaseAgencyService.delete('portfolio', this.portfolioData.id)
      .then(
        res => {
          this.router.navigate(['/portfolio-view']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
    */
  cancel() {
    this.router.navigate(['/portfolio-view']);
  }
}
