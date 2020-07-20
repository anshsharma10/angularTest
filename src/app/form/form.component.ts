import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidationErrors, FormControl, ValidatorFn, Validator, AbstractControl } from '@angular/forms';
import { OrdersService } from '../orders.service'
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  group = this.fb.group({
    masterForm: this.fb.array([])
  })

  constructor(private fb: FormBuilder,
  private ordersService: OrdersService,
  private router: Router,
  ) { }


  ngOnInit() {
  }

  /* Generates a FormGroup containing each form control for one order, along with associated validators. **/
  initForm() {
    const newForm = this.fb.group({
      orderChoice: ['', Validators.required],
      ketchup: [''],
      mustard: [''],
      lettuce: [''],
      tomato: [''],
      burgerChoice: [''],
      fries: [''],
      salad: [''],
      doneness: [''],
      steakChoice: [''],
      potato: [''],
      special: [''],
    });
    debugger
    newForm.setValidators(this.requiredIfPreviousValid())
    return newForm;
  }

  /* Adds a new form from initForm to the FormArray containing all orders **/
  addForm() {
    const control = <FormArray>this.group.get('masterForm');
    control.push(this.initForm())
  }

  /* Returns the FormArray of all orders **/
  getOrders() {
    return <FormArray>this.group.get('masterForm');
  }

  /* Removes an order with index i from the FormArray of all orders **/
  removeOrder(i) {
    (<FormArray>this.group.get('masterForm')).removeAt(i);
  }

  /* Resets user-entered options for the salad portion of the order with index i **/
  resetSalad(i){
    this.group.get('masterForm')['controls'][i]['controls']['salad'].setValue('');
  }

  /* Resets user-entered options for the fries portion of the order with index i **/
  resetFries(i){
    this.group.get('masterForm')['controls'][i]['controls']['fries'].setValue('');
  }

  /* Resets user-entered options for the potatoes portion of the order with index i **/
  resetPotato(i){
    this.group.get('masterForm')['controls'][i]['controls']['potato'].setValue('');
  }

  /* Resets user-entered options for the burger portion and all subsequent portions of the order with index i **/
  resetBurger(i){
    this.group.get('masterForm')['controls'][i]['controls']['ketchup'].setValue('');
    this.group.get('masterForm')['controls'][i]['controls']['mustard'].setValue('');
    this.group.get('masterForm')['controls'][i]['controls']['lettuce'].setValue('');
    this.group.get('masterForm')['controls'][i]['controls']['tomato'].setValue('');
    this.group.get('masterForm')['controls'][i]['controls']['burgerChoice'].setValue('');
    this.resetFries(i);
    this.resetSalad(i);
  }

  /*  Resets user-entered options for the steak portion and all subsequent portions of the order with index i **/
  resetSteak(i){
    this.group.get('masterForm')['controls'][i]['controls']['doneness'].setValue('');
    this.group.get('masterForm')['controls'][i]['controls']['steakChoice'].setValue('');
    this.resetFries(i);
    this.resetSalad(i);
  }

  /* A validator function that controls all the validation for a particular FormGroup in the FormArray **/
  requiredIfPreviousValid() : ValidatorFn{
       return (group: FormGroup): ValidationErrors => {
          const orderChoice = group.controls['orderChoice'];
          const burgerChoice = group.controls['burgerChoice'];
          const fries = group.controls['fries'];
          const salad = group.controls['salad'];
          const potato = group.controls['potato'];
          const doneness = group.controls['doneness'];
          const steakChoice = group.controls['steakChoice'];

          /* Make sure fries or salad is chosen if a burger has been selected **/
          if (orderChoice.value == 'burger' && burgerChoice.value == '') {
             burgerChoice.setErrors({noBurgerChoice: true});
          } else {
             burgerChoice.setErrors(null);
          }

          /* Make sure salad or potatoes are chosen if a steak has been selected **/
          if (orderChoice.value == 'steak' && steakChoice.value == '') {
             steakChoice.setErrors({noSteakChoice: true});
          } else {
             steakChoice.setErrors(null);
          }

          /* Make sure doneness is selected if a steak has been chosen **/
          if (orderChoice.value == 'steak' && doneness.value == '') {
             doneness.setErrors({noDoneness: true});
          } else {
             doneness.setErrors(null);
          }

          /* Make sure size for fries is selected if fries have been chosen **/
          if (burgerChoice.value == 'fries' && fries.value == '') {
             fries.setErrors({noFries: true});
          } else {
             fries.setErrors(null);
          }

          /* Make sure dressing for salad has been selected if salad has been chosen **/
          if ((burgerChoice.value == 'salad' || steakChoice.value == 'salad') && salad.value == '') {
             salad.setErrors({noSalad: true});
          } else {
             salad.setErrors(null);
          }

          /* Make sure the number of potatoes has been selected if potatoes have been chosen **/
          if (steakChoice.value == 'potato' && potato.value == '') {
             potato.setErrors({noPotato: true});
          } else if ((steakChoice.value == 'potato' && !(potato.value == parseInt(potato.value, 10))) || (parseInt(potato.value, 10) <= 0)) {
            potato.setErrors({notValidPotato: true})
          } else {
             potato.setErrors(null);
          }

          return;
    };
 }

  /* Submits the orders to the ordersService **/
  onSubmit(orderData) {
    this.ordersService.setOrders(orderData);
    this.router.navigate(['/order'])
  }

}

