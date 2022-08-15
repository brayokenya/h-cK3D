import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BaseAPIService {
    private headers = new HttpHeaders({Accept: 'application/json'});

    constructor(private http: HttpClient) {
    }

    private static handleError(error: HttpErrorResponse) {
        /**
         * Handle Error arising from the http request made.
         */
        const msg = (error.message) ? error.message : error.status ? `${error.statusText}` : 'Server error';
        return throwError(msg);
    }

    private static throwError() {
        /**
         * Warn user of unset url parameter.
         */
        throw Error('Endpoint / url has not been provided. Pass the endpoint before querying your API using this service.');
    }

    public listWithProgress<T>(url: string): Observable<HttpEvent<{}>> {
        const request = new HttpRequest(
            'GET', url, {},
            {reportProgress: true});
        return this.http.request(request);
    }

    public postWithProgress<T>(url: string, data?: any): Observable<HttpEvent<{}>> {
        const request = new HttpRequest(
            'POST', url, data,
            {reportProgress: true});
        return this.http.request(request);
    }

    public list<T>(url: string, queryParams: {} = {}): Observable<T> {
        /**
         * Get all objects of type T from a provided url endpoint.
         * @url: api endpoint.
         * @return: Observable for consumers to subscribe to.
         */
        if (url === undefined) {
            BaseAPIService.throwError();
        } else {
            return this.http.get<T>(url,
                {headers: this.headers, params: queryParams}).pipe(catchError(BaseAPIService.handleError));
        }
    }

    public retrieve<T>(url: string, id: string, queryParams: {} = {}): Observable<T> {
        /**
         * Get an object from database.
         * @url: api endpoint.
         * @id: database id of item.
         * @return Observable for consumers to subscribe to.
         */
        if (url === undefined) {
            BaseAPIService.throwError();
        } else {
            return this.http.get<T>(`${url}${id}/`,
                {headers: this.headers, params: queryParams}).pipe(catchError(BaseAPIService.handleError));
        }
    }

    public create<T>(url: string, object: T, queryParams: {} = {}): Observable<T> {
        /**
         * Create a Generic object T.
         * @return Observable for consumers to subscribe to.
         */
        if (url === undefined) {
            BaseAPIService.throwError();
        } else {
            return this.http.post<T>(url, object,
                {headers: new HttpHeaders({'Content-Type': 'application/json'}), params: queryParams})
                .pipe(catchError(BaseAPIService.handleError));
        }
    }

    public put<T>(url, id: string, newObject: T, queryParams: {} = {}): Observable<T> {
        /**
         * Update a database object.
         * @url: api endpoint for the data.
         * @id: database id of item to be updated.
         * @new_object: the new object instance.
         * @return Observable for consumers to subscribe to.
         */
        if (url === undefined) {
            BaseAPIService.throwError();
        } else {
            return this.http.put<any>(`${url}${id}/`, newObject,
                {headers: new HttpHeaders({'Content-Type': 'application/json'}), params: queryParams})
                .pipe(catchError(BaseAPIService.handleError));
        }
    }

    public patch<T>(url, id: string, updateParams: T): Observable<T> {
        /**
         * Partially update a database object.
         * @url: api endpoint for the data.
         * @id: database id of item to be updated.
         * @new_object: the new object instance.
         * @return Observable for consumers to subscribe to.
         */
        if (url === undefined) {
            BaseAPIService.throwError();
        } else {
            return this.http.patch<any>(`${url}${id}/`, updateParams, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
                .pipe(catchError(BaseAPIService.handleError));
        }
    }

    public delete<T>(url, id: string, queryParams: {} = {}): Observable<T> {
        /**
         * Remove object from database.
         * @url: api endpoint.
         * @id: db ID of object to delete.
         */
        if (url === undefined) {
            BaseAPIService.throwError();
        } else {
            return this.http.delete<T>(`${url}${id}/`,
                {headers: new HttpHeaders({'Content-Type': 'application/json'}), params: queryParams})
                .pipe(catchError(BaseAPIService.handleError));
        }
    }

    public downloadCSV<T>(url: string, queryParams: {} = {}) {
        return this.http.get(
            `${url}`,
            {headers: new HttpHeaders({'Content-Type': 'application/csv'}), params: queryParams, responseType: 'text'}
            ).pipe(catchError(BaseAPIService.handleError)
        );
    }

    public uploadFormData<T>(url: string, formData: FormData) {
        if (url === undefined) {
            BaseAPIService.throwError();
        } else {
            return this.http.post(url, formData).pipe(catchError(BaseAPIService.handleError));
        }
    }

}
