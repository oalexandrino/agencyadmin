import { PortfolioService } from './../../services/portfolio/portfolio-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.scss']
})
export class PortfolioViewComponent implements OnInit {

  portfolioItems: Array<any>;

  constructor(
    public firebasePortfolioService: PortfolioService,
    private router: Router
  ) { }

  ngOnInit() {
  this.getData();

  }

  getData() {
    this.firebasePortfolioService.getPortfolioListing()
    .subscribe(result => {
      this.portfolioItems = result;
    });
  }

  viewPortfolioDetails(item) {
    this.router.navigate(['/portfolio-details/' + item.payload.doc.id]);
  }

}
