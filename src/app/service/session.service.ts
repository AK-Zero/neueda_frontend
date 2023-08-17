import { Injectable } from '@angular/core';
import { Order } from '../domain/order';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { 
    this.order = {id: 0, stockTicker: '', price: 0, volume: 0, statusCode: 'PENDING', buyOrSell: 'BUY'};
  }

  order: Order;

  addOrder(order: Order): void{
    this.order = order;
  }

  resetOrder(): void{
    this.order = {id: 0, stockTicker: '', price: 0, volume: 0, statusCode: 'PENDING', buyOrSell: 'BUY'};
  }
}
