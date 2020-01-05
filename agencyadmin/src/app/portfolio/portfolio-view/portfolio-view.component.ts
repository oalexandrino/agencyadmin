import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { PortfolioService, PortfolioByDate } from './../../services/portfolio/portfolio-service.service';
import { AgencyService } from 'src/app/services/agency.service';
import { MatSlideToggleChange } from '@angular/material';
import { ArrayList } from 'src/app/lib/util/ArrayList';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.scss']
})
export class PortfolioViewComponent implements OnInit {
  selectedPrice = 0;
  searchValue = '';
  portfolioItems: Array<any>;
  portfolioNoAvailableItems: Array<any>;
  portfolioFilteredItemsByPrice: Array<any>;
  portfolioFilteredItemsByName: Array<any>;
  priceValue = 0;
  noElementsMessage = false;
  noPrice = false;
  noDescription = false;
  noEditing = false;
  noAvailableItems = false;

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

  toggleHideNoAvailableItems(event: MatSlideToggleChange) {
    console.log('toggleHideNaAvailableItems');
    if (!this.noAvailableItems) {
      this.setOldItems();
      this.noAvailableItems = true;
    } else {
      this.setAllItems();
      this.noAvailableItems = false;
    }
  }

  getData() {
    this.firebaseAgencyService.getListing('portfolio')
    .subscribe(result => {
      this.setPortfolioArrays(result);
    });
  }

  viewPortfolioDetails(item) {
    this.router.navigate(['/portfolio-details/' + item.payload.doc.id]);
  }

  searchByName() {
      const value = this.searchValue.toLowerCase();
      this.firebaseAgencyService.searchByValue('portfolio', 'nameToSearch', value)
      .subscribe(result => {
        this.portfolioFilteredItemsByName = result;
        this.portfolioItems = ArrayList.combine(result, this.portfolioFilteredItemsByPrice);
        this.portfolioItems = ArrayList.combine(this.portfolioItems, this.portfolioNoAvailableItems);
      });

  }

  searchByRangeOfPrices(event) {

      this.selectedPrice = event.value;
      this.firebasePortfolioService.getPorfolioByPrice(event.value)
      .subscribe(result => {
        this.portfolioFilteredItemsByPrice = result;
        this.portfolioItems = ArrayList.combine(result, this.portfolioFilteredItemsByName);
        this.portfolioItems = ArrayList.combine(result, this.portfolioFilteredItemsByName);
        this.portfolioItems = ArrayList.combine(this.portfolioItems, this.portfolioNoAvailableItems);

        if (result.length === 0) {
          this.noElementsMessage  = true;
        } else {
          this.noElementsMessage  = false;
        }
      });
  }

  private setPortfolioArrays(result) {
    this.portfolioItems = result;
    this.portfolioNoAvailableItems = result;
    this.portfolioFilteredItemsByPrice = result;
    this.portfolioFilteredItemsByName = result;
  }

  private setAllItems() {
    this.firebasePortfolioService.getPortfolioBydate(PortfolioByDate.All)
      .subscribe(result => {
        this.portfolioNoAvailableItems = result;
        this.portfolioItems = ArrayList.combine(result, this.portfolioFilteredItemsByName);
        this.portfolioItems = ArrayList.combine(this.portfolioItems, this.portfolioFilteredItemsByPrice);
      });
  }

  private setOldItems() {
    const currentDate = new Date();
    this.firebasePortfolioService.getPortfolioBydate(PortfolioByDate.Old, currentDate)
      .subscribe(result => {
        this.portfolioNoAvailableItems = result;
        this.portfolioItems = ArrayList.combine(result, this.portfolioFilteredItemsByName);
        this.portfolioItems = ArrayList.combine(this.portfolioItems, this.portfolioFilteredItemsByPrice);
      });
  }

}
