class NewIngredientRequest{
  name: string;
  min: number;
  max: number;
  unitOfMeasureId: number

  constructor(name: string, min: number, max: number, unitOfMeasureId: number){
    this.name = name;
    this.min = min;
    this.max = max;
    this.unitOfMeasureId = unitOfMeasureId;
  }
}

export default NewIngredientRequest;