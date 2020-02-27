import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/form-data' }) };

@Injectable()
export class UploadService {

  constructor(public httpClient: HttpClient) { }

  public postFile(formData: FormData, endpoint): Observable<any> {

    return this.httpClient
      .post(endpoint, formData).pipe(
        tap(_ => console.log(`Uploading via "${endpoint}" endpoint.`)),
        catchError(this.handleError('postFile', endpoint))
      );

  }

  private handleError(operation: string, endpoint: string) {

    return (err: any) => {
      const errMsg = `Error at performing "${operation}()" in "UploadService" when reaching from "${endpoint}". Error detail: ${err.message}`;
      console.error(`${errMsg}:`, err)
      if (err instanceof HttpErrorResponse) {
        console.error(`status: ${err.status}, ${err.statusText}`);
      }
      return Observable.throwError(errMsg);
    };

  }

}
