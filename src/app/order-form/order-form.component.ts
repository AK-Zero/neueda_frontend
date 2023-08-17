import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../service/apiservice.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent{


  orderForm = new FormGroup({
    id: new FormControl({value: this.sessionService.order?.id || '', disabled: true}),
    stockTicker: new FormControl(this.sessionService.order?.stockTicker, [Validators.required]),
    price: new FormControl(this.sessionService.order?.price, [Validators.required]),
    volume: new FormControl(this.sessionService.order?.volume, [Validators.required]),
    buyOrSell: new FormControl(this.sessionService.order?.buyOrSell, [Validators.required]),
    statusCode: new FormControl({value: 'PENDING', disabled: true})
  })

  constructor(
    private router: Router,
    private apiService: APIService,
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) {}

  back(): void {
    this.router.navigate(['']);
  }

  // TODO 3 implement onSubmit
  onSubmit() {
    if(this.sessionService.order.id==0){
    this.apiService
      .addOrder(
        this.orderForm.controls['stockTicker'].value!!,
        this.orderForm.controls['buyOrSell'].value!!,
        this.orderForm.controls['price'].value!!,
        this.orderForm.controls['volume'].value!!
      )
      .subscribe({
        next: () => this.router.navigate(['/list']),
        error: (error) => console.error('Error occurred ' + error),
      });
    }
    else{
      this.apiService
      .updateOrder(
        this.sessionService.order.id,
        this.orderForm.controls['stockTicker'].value!!,
        this.orderForm.controls['buyOrSell'].value!!,
        this.orderForm.controls['price'].value!!,
        this.orderForm.controls['volume'].value!!
      )
      .subscribe({
        next: () => this.router.navigate(['/list']),
        error: (error) => console.error('Error occurred ' + error),
      });
    }
  }

  
}
