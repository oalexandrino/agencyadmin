import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PortfolioService } from './../../services/portfolio/portfolio-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-portfolio',
  templateUrl: './new-portfolio.component.html',
  styleUrls: ['./new-portfolio.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class NewPortfolioComponent implements OnInit {
  public portfolioForm: FormGroup;
  item: any;

  validation_messages = {
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
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(value){
    this.firebasePortfolioService.insertPortfolio(value)
    .then(
      res => {
        this.createForm();
        this.router.navigate(['/portfolio-view']);
      }
    )
  }  

  createForm() {
    this.portfolioForm = this.fb.group({
      name: ['', Validators.required ],
      desc: ['', Validators.required ],
      price: ['', Validators.required ]
    });
  }

  cancel() {
    this.router.navigate(['/portfolio-view']);
  }  

}
