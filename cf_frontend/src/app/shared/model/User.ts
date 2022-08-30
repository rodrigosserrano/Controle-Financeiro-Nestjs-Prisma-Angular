export interface UserRegistry {
  email: string,
  password: string,
  confirmPassword?: string;
  firstName: string,
  lastName: string,
  grossIncome: string | number
}

export interface UserLogin {
  email: string,
  password: string,
}
