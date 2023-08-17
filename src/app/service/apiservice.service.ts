import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { __param } from "tslib";
import { Order } from '../domain/order';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>("http://localhost:8080/order/get/all")
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  getOrderById(id: number) {
    let orderParams = new HttpParams();
    orderParams = orderParams.append("id",id);

    return this.http.get<Order>(`http://localhost:8080/order/get/by/id`, {params: orderParams})
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  deleteOrder(id: number) {
    let orderParams = new HttpParams();
    orderParams = orderParams.append("id",id);

    return this.http.delete<void>(`http://localhost:8080/order/delete`, {params: orderParams});
  }

  addOrder(stockTicker: string, buyOrSell: String, price: number, volume: number ): Observable<any> {
    return this.http.post("http://localhost:8080/order/create", { stockTicker, price, volume, buyOrSell });
  }

  updateOrder(id:number, stockTicker: string, buyOrSell: String, price: number, volume: number ) {
    return this.http.put(`http://localhost:8080/order/edit`, { id, stockTicker, price, volume, buyOrSell });
  }

  getOrderByTicker(stockTicker: string) {
    let orderParams = new HttpParams();
    orderParams = orderParams.append("ticker",stockTicker);

    return this.http.get<Order[]>('http://localhost:8080/order/find/by/ticker', {params: orderParams})
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  getOrdersWhichArePending() {

    return this.http.get<Order[]>('http://localhost:8080/order/find/pending')
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  getOrderWhoseValueGreaterThanGiven(value: number) {
    let orderParams = new HttpParams();
    orderParams = orderParams.append("value",value);

    return this.http.get<Order[]>('http://localhost:8080/order/find/greater/than/value', {params: orderParams})
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  makeOrderFilled(id: number) {
    let orderParams = new HttpParams();
    orderParams = orderParams.append("id",id);

    return this.http.post<Order>(`http://localhost:8080/order/make/filled`, {params: orderParams})
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  makeOrderRejected(id: number) {
    let orderParams = new HttpParams();
    orderParams = orderParams.append("id",id);

    return this.http.post<Order>(`http://localhost:8080/order/make/rejected`, {params: orderParams})
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }



  private handleError(error: HttpErrorResponse) {
    console.error("An error occurred:", error.error);
    return throwError(() => new Error("Please try again later."));
  }

}
