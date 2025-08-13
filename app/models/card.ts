export interface Transaction {
  name: string;
  amount: number;
  deposit: boolean;
}

export interface Card {
  id: number;
  type: string;
  color: string;
  description: string;
  number: string;
  secret: string;
  expiry: string;
  balance: number;
  transactions: Transaction[];
}