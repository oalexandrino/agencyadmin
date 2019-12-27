import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(public db: AngularFirestore) {}

  getListing(collectionName: string) {
    return this.db.collection(collectionName).snapshotChanges();
  }

  get(collectionName: string, key) {
    return this.db.collection(collectionName).doc(key).snapshotChanges();
  }

  delete(collectionName: string, key) {
    return this.db.collection(collectionName).doc(key).delete();
  }

  update(collectionName: string, key, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection(collectionName).doc(key).set(value);
  }

  insert(collectionName: string, value) {
    return this.db.collection(collectionName).add(value);
  }

}
