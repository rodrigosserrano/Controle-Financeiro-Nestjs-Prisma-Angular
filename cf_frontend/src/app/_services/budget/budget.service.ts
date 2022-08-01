import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Budget } from "../../_model/Budget";
import {UtilsHelpers} from "../../_helpers/utils.helpers";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  public budgets: Budget[] = []
  private apiUrl:string    = 'http://localhost:3000/budget';

  constructor(private httpClient: HttpClient) {
    this.requestBudget();
  }

  private requestBudget(){
    this.httpClient.get<any>(this.apiUrl).subscribe((res) => {
      res.result.map(((budget: Budget) => {
        this.budgets[budget.id] = {
          id: budget.id,
          name: budget.name,
          description: budget.description,
          cash: budget.cash,
        }
      }))
    })
  }

  public addBudget(budget: Budget){
    if (UtilsHelpers.IsEmpty(budget)) return;
    //Formata o cash
    budget.cash = JSON.stringify(budget.cash);

    this.httpClient.post(this.apiUrl, budget).subscribe((r:any) => {
      window.location.reload();
    })
  }
}


