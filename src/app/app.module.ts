import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, Validator, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FormComponent } from './form/form.component';
import { OrdersService } from './orders.service';
import { OrderDisplayComponent } from './order-display/order-display.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([
    { path: '', component: FormComponent},
    { path: 'order', component: OrderDisplayComponent}
  ]) ],
  declarations: [ AppComponent, HelloComponent, FormComponent, OrderDisplayComponent ],
  bootstrap:    [ AppComponent ],
  providers: [OrdersService]
})
export class AppModule { }
