class DepositRequest {
  accountId: number;
  ingredientId: number;
  amount: number;
  entryDate: Date;
  expirationDate: Date;

  constructor(accountId: number, ingredientId: number, amount: number, entryDate: Date, expirationDate: Date) {
    this.accountId = accountId;
    this.ingredientId = ingredientId;
    this.amount = amount;
    this.entryDate = entryDate;
    this.expirationDate = expirationDate;
  }
}

export default DepositRequest;