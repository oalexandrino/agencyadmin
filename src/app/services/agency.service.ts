import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(public db: AngularFirestore) {}

  searchByValue(collectionName: string, searchColumn, searchValue) {
    return this.db.collection(collectionName, ref => ref.where(searchColumn, '>=', searchValue)
      .where(searchColumn, '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  getListing(collectionName: string) {
    return this.db.collection(collectionName).snapshotChanges();
  }

  getCollectionItem(collectionName: string, key): Observable<any> {
    return this.db.collection(collectionName).doc(key).valueChanges();
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
