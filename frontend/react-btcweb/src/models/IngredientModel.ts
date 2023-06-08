import UnitOfMeasureModel from "./UnitOfMeasureModel";

class IngredientModel{
    id: number;
    name: string;
    min: number;
    max: number;
    unitOfMeasure: UnitOfMeasureModel;

    constructor(id: number, name: string, min: number, max: number, unitOfMeasure: UnitOfMeasureModel){
        this.id = id;
        this.name = name;
        this.min = min;
        this.max = max;
        this.unitOfMeasure = unitOfMeasure;
    }

}
export default IngredientModel;