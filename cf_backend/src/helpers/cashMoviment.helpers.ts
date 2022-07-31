import { CashMovement } from "../resources/cash_movement/entities/cashMovement.entity";
import { Budget } from "../resources/budget/entities/budget.entity";
import {type} from "os";

export class CashMovimentHelpers {

    static ENTRADA  = 1;
    static SAIDA    = 2;

    static calcCashMovement(budget: Budget, cashMovement: CashMovement){
        let newBalanceBudget: number = -1;
        if(!budget.cash === undefined || cashMovement.cash === undefined) return newBalanceBudget;

        let balanceBudget: number       = Number(budget.cash);
        let cash: number                = Number(cashMovement.cash);

        if (cashMovement.typeMovementId == this.SAIDA){
            newBalanceBudget = (balanceBudget - cash);
            if (newBalanceBudget < 0) return JSON.stringify({ result: `Saldo insuficiente para o budget ${budget.name}.` });
        } else if (cashMovement.typeMovementId == this.ENTRADA) {
            newBalanceBudget = (balanceBudget + cash);
        }

        return Number(newBalanceBudget.toFixed(2));
    }
}