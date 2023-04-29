import UnitOfMeasureModel from "./UnitOfMeasureModel";

class IngredientModel{
    id: number;
    name: string;
    stockQuantity: number;
    unitOfMeasure: UnitOfMeasureModel;

    constructor(id: number, name: string, stockQuantity: number, unitOfMeasure: UnitOfMeasureModel){
        this.id = id;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.unitOfMeasure = unitOfMeasure;
    }

}
export default IngredientModel;