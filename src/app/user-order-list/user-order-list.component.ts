import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Order } from '../domain/order';
import { APIService } from '../service/apiservice.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.css']
})
export class UserOrderListComponent implements OnInit {

  orders : Order[] = [];

constructor(private router:Router, private apiService: APIService, 
  private sessionService: SessionService) {}
  
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    const result = this.apiService.getOrders();
    result.subscribe(
      {
        next : data =>  this.orders = data,
        error: error => console.log(error.statusText)
      }
    );
  }
  
  addOrder() {
    this.router.navigate(['/edit']);
    this.sessionService.resetOrder();
  }

  deleteOrder(id: number){
    const result = this.apiService.deleteOrder(id);
    result.subscribe(
      {
        next : data =>  this.getOrders(),
        error: error => console.log(error.statusText)
      }
    );
  }

  editOrder(order: Order){

    if(order.statusCode == "PENDING"){
    this.router.navigate(['/edit']);
    this.sessionService.addOrder(order);
    }
    else{
      alert("Cannot edit non-pending order!");
    }
  }
}

