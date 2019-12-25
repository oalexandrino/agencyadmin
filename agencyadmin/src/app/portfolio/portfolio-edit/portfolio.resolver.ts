import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { PortfolioService } from './../../services/portfolio/portfolio-service.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioResolver implements Resolve<any> {

  constructor(public firebasePortfolioService: PortfolioService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      const portfolioId = route.paramMap.get('id');
      this.firebasePortfolioService.getPortfolio(portfolioId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
