import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AgencyService } from '../../services/agency.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioFormResolver implements Resolve<any> {

  constructor(public firebaseAgencyService: AgencyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return new Promise((resolve, reject) => {
      const portfolioId = route.paramMap.get('id');
      this.firebaseAgencyService.get('portfolio', portfolioId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
