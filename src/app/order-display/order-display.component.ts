import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service'
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})
export class OrderDisplayComponent implements OnInit {

  constructor(private ordersService: OrdersService,
  private router: Router,
  private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  /* Returns the orders from ordersService **/
  getOrders() {
    return this.ordersService.getOrders();
  }

  /* When the appropriate button has been clicked, takes the user back to the orders page **/
  returnToOrder() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

}