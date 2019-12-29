import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(public db: AngularFirestore) {}

  getPorfolioByPrice(value) {
    return this.db.collection('portfolio', ref => ref.orderBy('price').startAt(value)).snapshotChanges();
  }

}
