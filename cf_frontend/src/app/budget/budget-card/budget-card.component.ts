import { Component, Input } from '@angular/core';
import {Budget} from "../../_model/Budget";

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.sass']
})
export class BudgetCardComponent {
  @Input()
  public budget: Budget;
  public colorCard: string = 'blue';

}
