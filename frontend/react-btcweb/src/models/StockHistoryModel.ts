import IngredientModel from "./IngredientModel";

class StockHistoryModel {
  id: number;
  accountName: String;
  type: string;
  ingredient: IngredientModel;
  amount: number;
  date: Date;

  constructor(id: number, accountName: String, type: string, ingredient: IngredientModel, amount: number, date: Date) {
    this.id = id;
    this.accountName = accountName;
    this.type = type;
    this.ingredient = ingredient;
    this.amount = amount;
    this.date = date;
  }
}

export default StockHistoryModel;