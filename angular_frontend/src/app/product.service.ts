import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Product } from "./product";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productsUrl = environment.apiUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  /**
   * GET products from the server
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/products`)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  /**
   * Get Product details of a single product
   * @param id 
   */
  getProductDetails(id:number): Observable<Product>{
    const url = `${this.productsUrl}/products/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product details for id=${id}`)),
      catchError(this.handleError<Product>(`getProductDetails id=${id}`))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Log a ProductService message with the MessageService
   * @param message Log message for MessageService
   */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
