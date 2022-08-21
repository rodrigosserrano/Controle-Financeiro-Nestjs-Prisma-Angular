export interface CashMovement {
    id: number;
    association: string;
    budgetId: number;
    description: string;
    cash: number | string;
    dateToPay: string | Date | any;
    typeMovementId: number;
}
