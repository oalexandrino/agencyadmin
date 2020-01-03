import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { PortfolioService } from './../../services/portfolio/portfolio-service.service';
import { AgencyService } from 'src/app/services/agency.service';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.scss']
})
export class PortfolioViewComponent implements OnInit {
  selectedPrice = 0;
  searchValue = '';
  portfolioItems: Array<any>;
  portfolioFilteredItemsByPrice: Array<any>;
  portfolioFilteredItemsByName: Array<any>;
  priceValue = 0;
  noElementsMessage = false;
  noPrice = false;
  noDescription = false;
  noEditing = false;

  constructor(
    public firebaseAgencyService: AgencyService,
    public firebasePortfolioService: PortfolioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  toggleCancelEditing(event: MatSlideToggleChange) {
    console.log('toggleCancelEditing');
    if (this.noEditing) {
      this.noEditing = false;
    } else {
      this.noEditing = true;
    }
  }

  toggleHidePrices(event: MatSlideToggleChange) {
    console.log('toggleHidePrices');
    if (this.noPrice) {
      this.noPrice = false;
    } else {
      this.noPrice = true;
    }
  }

  toggleHideDescription(event: MatSlideToggleChange) {
    console.log('toggleHideDescription');
    if (this.noDescription) {
      this.noDescription = false;
    } else {
      this.noDescription = true;
    }
  }

  getData() {
    this.firebaseAgencyService.getListing('portfolio')
    .subscribe(result => {
      this.portfolioItems = result;
      this.portfolioFilteredItemsByPrice = result;
      this.portfolioFilteredItemsByName = result;
    });
  }
  viewPortfolioDetails(item) {
    this.router.navigate(['/portfolio-details/' + item.payload.doc.id]);
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.firebaseAgencyService.searchByValue('portfolio', 'name', this.searchValue)
    .subscribe(result => {
      this.portfolioFilteredItemsByName = result;
      this.portfolioItems = this.combineLists(result, this.portfolioFilteredItemsByPrice);
    });
  }

  rangeOfPricesChange(event) {

    this.selectedPrice = event.value;
    this.firebasePortfolioService.getPorfolioByPrice(event.value)
    .subscribe(result => {
      this.portfolioFilteredItemsByPrice = result;
      this.portfolioItems = this.combineLists(result, this.portfolioFilteredItemsByName);

      if (result.length === 0) {
        this.noElementsMessage  = true;
      } else {
        this.noElementsMessage  = false;
      }
    });
  }

  combineLists(a, b) {
    const result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id === x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

}
