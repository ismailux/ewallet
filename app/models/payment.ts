/**
 * Represents a linked bank account for top-up or transfer.
 */
export interface Account {
  /** Unique identifier of the account */
  id: string;
  /** Display name of the bank */
  bankName: string;
  /** URL to the bank's logo image */
  bankLogoUrl: string;
  /** Last 4 digits of the account number */
  last4: string;

  iban: string;
  bic: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
  bankAddress: string;
  messageForRecipient: string;
}

/**
 * Represents a saved credit/debit card for top-up or transfer.
 */
export interface Card {
  /** Unique identifier of the card */
  id: string;
  /** Card brand (e.g., VISA, MasterCard) */
  brand: string;
  /** Last 4 digits of the card number */
  last4: string;
  /** Month of expiry (1–12) */
  expiryMonth: number;
  /** Year of expiry (e.g., 2025) */
  expiryYear: number;
  logo: string;
  chip: string;
  logoIcon: string;
  bg : string;
  number: string;
  holderName: string;
  expiryDate: string;  
  bank: string;
  type: string;
  indicator: string;
}
