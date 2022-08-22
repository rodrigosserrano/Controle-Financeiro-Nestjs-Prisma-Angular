export interface UserRegistry {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  grossIncome: string | number
}

export interface UserLogin {
  email: string,
  password: string,
}
