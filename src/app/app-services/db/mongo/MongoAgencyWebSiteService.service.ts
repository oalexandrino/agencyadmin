import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Service } from 'src/model/service';
import 'rxjs/add/observable/throw';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class MongoAgencyWebSiteService {

  apiURL = 'http://localhost:3000/api/';

  constructor(public router: Router, public http: HttpClient) { }

  private handleError(operation: string) {
    return (err: any) => {
      const errMsg = `Error at performing "${operation}()" in MongoAgencyWebSiteService when reaching from ${this.apiURL}.`;
      console.log(`${errMsg}:`, err)
      if (err instanceof HttpErrorResponse) {

        console.log(`status: ${err.status}, ${err.statusText}`);
      }
      return Observable.throwError(errMsg);
    }
  }

  getListing(endpoint: string): Observable<any[]> {

    const apiUrl = this.apiURL + endpoint;

    return this.http.get<any[]>(apiUrl)
      .pipe(
        tap(serviceItems => console.log(`reading listing of ${endpoint} endpoint`)),
        catchError(this.handleError('getListing'))
      );
  }

  insert(endpoint: string, insertOptions: any): Observable<any> {

    const apiUrl = `${this.apiURL}${endpoint}`;

    return this.http.post(apiUrl, insertOptions, httpOptions).pipe(
      tap(_ => console.log(`inserting item for the ${endpoint} endpoint`)),
      catchError(this.handleError('insert'))
    );
  }

  update(endpoint: string, updateOptions: any): Observable<any> {

    const apiUrl = `${this.apiURL}${endpoint}`;

    return this.http.put(apiUrl, updateOptions, httpOptions).pipe(
      tap(_ => console.log(`updating item id=${updateOptions.id} for the ${endpoint} endpoint`)),
      catchError(this.handleError('update'))
    );
  }

  getCollectionItem(endpoint: string, key: string): Observable<any> {

    const url = `${this.apiURL}${endpoint}/${key}`;

    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`reading document item id=${key} for the ${endpoint} endpoint`)),
      catchError(this.handleError(`getCollectionItem id=${key}`))
    );
  }

  delete(endpoint: string, deleteOptions: any) {

    const apiUrl = `${this.apiURL}${endpoint}/${deleteOptions.id}`;

    return this.http.delete<any>(apiUrl, httpOptions).pipe(
      tap(_ => console.log(`document item id=${deleteOptions.id} for the ${endpoint} endpoint has been deleted`)),
      catchError(this.handleError('delete'))
    );
  }
}