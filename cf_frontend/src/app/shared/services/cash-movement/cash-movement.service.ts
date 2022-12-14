import {Injectable} from '@angular/core';
import { CashMovement } from "../../model/CashMovement";
import { TypeMovement } from "../../model/TypeMovement";
import {UtilsHelpers} from "../../helpers/utils.helpers";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CashMovementService {

  private apiUrl = 'http://localhost:3000/cash-movement';
  public typeMovements: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.requestTypeMovement();
  }

  addCashMovement(cashMovement: CashMovement) {
    if (UtilsHelpers.IsEmpty(cashMovement)) return;

    //format values
    cashMovement.budgetId = Number(cashMovement.budgetId);
    cashMovement.typeMovementId = Number(cashMovement.typeMovementId);
    cashMovement.cash = JSON.stringify(cashMovement.cash);
    cashMovement.dateToPay = new Date(cashMovement.dateToPay?.year, cashMovement.dateToPay?.month, cashMovement.dateToPay?.day).toISOString();

    console.log(cashMovement);
    this.httpClient.post(this.apiUrl, cashMovement).subscribe((r: any) => {
      window.location.reload();
    })
  }

  private requestTypeMovement(){
    this.httpClient.get<any>('http://localhost:3000/type-movement').subscribe((res: HttpResponse<TypeMovement[]>) => {
      res.body?.map(((typeMovement: TypeMovement) => {
        this.typeMovements[typeMovement.id] = {
          id: typeMovement.id,
          name: typeMovement.name,
          description: typeMovement.description
        }
      }))
    })
  }
}
