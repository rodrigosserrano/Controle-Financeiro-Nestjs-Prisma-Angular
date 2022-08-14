import {Component, Input, OnInit} from '@angular/core';
import {Budget} from "../../_model/Budget";
import {map} from "rxjs";

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.sass']
})
export class BudgetCardComponent  implements OnInit{
  @Input()
  public budget: Budget;
  public colorCard: string;

  constructor() {}

  ngOnInit() {
    const cash = (Number(this.budget?.cash));
    const initialCash = Number(this.budget?.initialCash);

    if (cash == 0) {
      this.colorCard = 'grey';
      100 <= 300*0.25
    } else if (cash <= (initialCash*(0.25))) {
      this.colorCard = 'red';
    } else if (cash <= (initialCash*(0.50))) {
      this.colorCard = 'orange';
    } else if (cash <= (initialCash*(0.75))) {
      this.colorCard = 'blue';
    } else {
      this.colorCard = 'green';
    }
  }

}
