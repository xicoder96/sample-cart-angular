import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { OrderDetails } from "./order-details";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = `${environment.apiUrl}/orders`;  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /**
   * Get Order details of a single product
   * @param id 
   */
  getOrderDetails(id: string): Observable<any> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched order details for id=${id}`)),
      catchError(this.handleError<any>(`getOrderDetails id=${id}`))
    );
  }

  /**
  }
  /**
   * Add order Details to be saved
   * @param order Order Details to be saved
   */
  addOrder(order: OrderDetails): Observable<any> {
    return this.http.post<any>(this.ordersUrl, order, this.httpOptions).pipe(
      tap((newOrder: any) => this.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<OrderDetails>('OrderDetails::addOrder'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Loging
      console.log(`${operation} failed: ${error}`)
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a OrderService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`OrderService: ${message}`);
  }
}
