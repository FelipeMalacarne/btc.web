class IngredientListRequest {
  ingredientId: number;
  amount: number;

  constructor(ingredientId: number, amount: number) {
    this.ingredientId = ingredientId;
    this.amount = amount;
  }
}

export default IngredientListRequest;