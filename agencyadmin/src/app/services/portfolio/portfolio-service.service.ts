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
}
