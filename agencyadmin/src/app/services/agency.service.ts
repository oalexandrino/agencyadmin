import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})


export class AgencyService {

  constructor(
    public db: AngularFirestore,

    ) {}

  getListing(collectionName: string) {
    return this.db.collection(collectionName).snapshotChanges();
  }

  getCollectionItem(collectionName: string, key) {

    return this.db.collection(collectionName).doc(key).valueChanges().
    subscribe(objectItem => {
      console.log(objectItem);
      return objectItem;
    });

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
