class NewIngredientRequest{
  name: string;
  unitOfMeasureId: number

  constructor(name: string, unitOfMeasureId: number){
    this.name = name;
    this.unitOfMeasureId = unitOfMeasureId;
  }
}

export default NewIngredientRequest;