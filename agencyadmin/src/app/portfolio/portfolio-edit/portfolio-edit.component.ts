import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PortfolioService } from './../../services/portfolio/portfolio-service.service';
import { AgencyService } from './../../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class PortfolioEditComponent implements OnInit {
  public portfolioForm: FormGroup;
  item: any;

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
    public firebasePortfolioService: PortfolioService,
    public firebaseAgencyService: AgencyService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.subscribePortfolioData();
  }

  private subscribePortfolioData() {
    this.route.data.subscribe(routeData => {
      const portfolioData = routeData.portfolio;
      if (portfolioData) {
        this.item = portfolioData.payload.data();
        this.item.id = portfolioData.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.portfolioForm = this.fb.group({
      name: [this.item.name, Validators.required],
      desc: [this.item.desc, Validators.required],
      price: [this.item.price, Validators.required]
    });
  }

  onSubmit(value) {
    value.price = Number(value.price);
    this.firebaseAgencyService.update('portfolio', this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/portfolio-view']);
      }
    )
  }

   delete() {
    if (confirm('Are you sure you want to delete this item?')) {
      this.firebaseAgencyService.delete('portfolio', this.item.id)
      .then(
        res => {
          this.router.navigate(['/portfolio-view']);
        },
        err => {
          console.log(err);
        }
      )
    }


  }

  cancel() {
    this.router.navigate(['/portfolio-view']);
  }
}
