import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

/* This class contains the user's order **/
@Injectable()
export class OrdersService {
  orders: FormArray
  constructor() { }

  setOrders(input) {
    this.orders = input;
  }

  getOrders() {
    return this.orders;
  }

}