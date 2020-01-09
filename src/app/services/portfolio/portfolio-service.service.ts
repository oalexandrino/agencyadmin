import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export enum PortfolioByDate {
  New,
  Old,
  All,
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(public db: AngularFirestore) {}

  getPortfolioBydate(type: PortfolioByDate, date?: Date ) {
    let portfolioItems;

    switch (type) {

      case PortfolioByDate.All:
        portfolioItems = this.db.collection('portfolio', ref => ref
          .orderBy('availableDate'))
          .snapshotChanges();
        break;

      case PortfolioByDate.New:
        portfolioItems = this.db.collection('portfolio', ref => ref
          .where('availableDate', '>', date)
          .orderBy('availableDate'))
          .snapshotChanges();
        break;

      case PortfolioByDate.Old:
        portfolioItems = this.db.collection('portfolio', ref => ref
          .where('availableDate', '<', date)
          .orderBy('availableDate'))
          .snapshotChanges();
        break;
    }

    return portfolioItems;

  }

  getPorfolioByPrice(value) {
    return this.db.collection('portfolio', ref => ref.orderBy('price').startAt(value)).snapshotChanges();
  }

}
