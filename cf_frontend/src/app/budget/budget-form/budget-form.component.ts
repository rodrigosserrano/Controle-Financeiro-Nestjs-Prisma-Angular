import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {BudgetService} from "../../_services/budget.service";
import {Budget} from "../../_model/Budget";

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.sass']
})
export class BudgetFormComponent implements OnInit {

  budgetForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.budgetForm = new FormGroup<any>({
      name: new FormControl('', {
        validators: Validators.required,
        nonNullable: true
      }),

      description: new FormControl('', {
        validators: Validators.required,
        nonNullable: true
      }),

      cash: new FormControl('', {
        validators: Validators.required,
        nonNullable: true
      }),
    })
  }

  onSubmit() {
    if (this.budgetForm.valid){
      this.budgetService.addBudget(this.budgetForm.value);
    }
  }

}
