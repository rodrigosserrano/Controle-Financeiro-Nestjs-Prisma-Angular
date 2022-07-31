import { Component, OnInit } from '@angular/core';
import { BudgetService } from "../../_services/budget.service";

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.sass']
})
export class BudgetListComponent {

  constructor(public budgetService: BudgetService) { }

}
