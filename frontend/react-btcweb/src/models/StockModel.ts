import IngredientModel from "./IngredientModel";

class StockModel {
  id: number;
  amount: number;
  ingredient: IngredientModel;

  constructor(id: number, amount: number, ingredient: IngredientModel) {
    this.id = id;
    this.amount = amount;
    this.ingredient = ingredient;
  }
}

export default StockModel;