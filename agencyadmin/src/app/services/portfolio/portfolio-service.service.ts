import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(public db: AngularFirestore) {}

  getPortfolioListing() {
    return this.db.collection('portfolio').snapshotChanges();
  }

  getPortfolio(portfolioKey) {
    return this.db.collection('portfolio').doc(portfolioKey).snapshotChanges();
  }

  deletePortfolio(portfolioKey){
    return this.db.collection('portfolio').doc(portfolioKey).delete();
  }

  updatePortfolio(portfolioKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('portfolio').doc(portfolioKey).set(value);
  }

  insertPortfolio(value){
    return this.db.collection('portfolio').add({
      name: value.name,
      desc: value.desc,
      price: parseInt(value.price),
    });
  }

}
