import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoAgencyWebSiteService {

  apiURL = 'https://localhost:3000/api';

  constructor(
    public router: Router,
    public http: HttpClient
  ) {

   }

  getListing(endpoint: string) {

    this.http.get(this.apiURL + endpoint).subscribe((data: any) => {
      console.log(data);
      return data;
    }, error => {
        console.log('There was an error at getting the collection: ' + endpoint, error.desc);
    });

  }

  insert(endpoint: string, value) {

  }

  update(endpoint: string, key, value) {

  }

  delete(endpoint: string, key) {

  }

  /*
  getCollectionItem(endpoint: string, key): Observable<any> {

  }*/


}
