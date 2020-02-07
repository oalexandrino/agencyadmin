import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Service } from 'src/model/service';

@Injectable({
  providedIn: 'root'
})
export class MongoAgencyWebSiteService {

  apiURL = 'http://localhost:3000/api';

  constructor(
    public router: Router,
    public http: HttpClient
  ) {

   }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

  getListing(endpoint: string): Observable<Service[]> {

    var output;
    let apiUrl = this.apiURL + endpoint;

    return this.http.get<Service[]>(apiUrl)
      .pipe(
        tap(serviceItems => console.log('reading serviceItems')),
        catchError(this.handleError('getListing', []))
      );

  }

/*
  insert(endpoint: string, value) {

  }

  update(endpoint: string, key, value) {

  }

  delete(endpoint: string, key) {

  }


  getCollectionItem(endpoint: string, key): Observable<any> {

  }*/


}
