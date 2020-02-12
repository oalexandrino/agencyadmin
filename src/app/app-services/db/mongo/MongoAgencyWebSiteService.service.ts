import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Service } from 'src/model/service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MongoAgencyWebSiteService {

  apiURL = 'http://localhost:3000/api/';

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

  getListing(endpoint: string): Observable<any[]> {

    const apiUrl = this.apiURL + endpoint;

    return this.http.get<any[]>(apiUrl)
      .pipe(
        tap(serviceItems => console.log(`reading listing of ${endpoint} endpoint`)),
        catchError(this.handleError('getListing', []))
      );

  }

  update(endpoint: string, updateOptions: any): Observable<any> {

    const apiUrl = `${this.apiURL}${endpoint}`;

    return this.http.put(apiUrl, updateOptions, httpOptions).pipe(
      tap(_ => console.log(`updating item id=${updateOptions.id} for the ${endpoint} endpoint`)),
      catchError(this.handleError<any>('update'))
    );

  }

  getCollectionItem(endpoint: string, key: string): Observable<any> {

    const url = `${this.apiURL}${endpoint}/${key}`;

    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`reading document item id=${key} for the ${endpoint} endpoint`)),
      catchError(this.handleError<any>(`getCollectionItem id=${key}`))
    );
  }

  delete(endpoint: string, updateOptions: any) {

    const apiUrl = `${this.apiURL}${endpoint}/${updateOptions.id}`;

    return this.http.delete<any>(apiUrl, httpOptions).pipe(
      tap(_ => console.log(`document item id=${updateOptions.id} for the ${endpoint} endpoint has been deleted`)),
      catchError(this.handleError<any>('delete'))
    );


  }


  /*
    insert(endpoint: string, value) {

    }

    delete(endpoint: string, key) {

    }
  */

}
