import UnitOfMeasureModel from "./UnitOfMeasureModel";

class IngredientModel{
    id: number;
    name: string;
    unitOfMeasure: UnitOfMeasureModel;

    constructor(id: number, name: string, unitOfMeasure: UnitOfMeasureModel){
        this.id = id;
        this.name = name;
        this.unitOfMeasure = unitOfMeasure;
    }

}
export default IngredientModel;