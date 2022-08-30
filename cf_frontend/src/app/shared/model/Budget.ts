export interface Budget {
  id: number;
  name: string;
  description: string;
  cash: number | string;
  initialCash?: number | string;
}
