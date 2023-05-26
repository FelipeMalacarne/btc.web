import IngredientModel from "./IngredientModel";

class IngredientListModel {
    amount: number;
    ingredient: IngredientModel;

    constructor(amount: number, ingredient: IngredientModel){
        this.amount = amount;
        this.ingredient = ingredient;
    }

}

export default IngredientListModel;