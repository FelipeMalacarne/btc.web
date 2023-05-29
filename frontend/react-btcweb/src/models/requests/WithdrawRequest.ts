class WithdrawRequest {
  ingredientId: number;
  accountId: number;
  amount: number;
  leaveDate: Date;

  constructor(ingredientId: number, accountId: number, amount: number, leaveDate: Date) {
    this.ingredientId = ingredientId;
    this.accountId = accountId;
    this.amount = amount;
    this.leaveDate = leaveDate;
  }
}

export default WithdrawRequest;