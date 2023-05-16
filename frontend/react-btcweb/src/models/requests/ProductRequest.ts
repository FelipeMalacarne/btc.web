import CategorySetRequest from "./CategorySetRequest";
import IngredientListRequest from "./IngredientListRequest";

class ProductRequest {
  name: string;
  description: string;
  price: number;
  active: boolean;
  categorySet: CategorySetRequest[];
  ingredientList: IngredientListRequest[];

  constructor(
    name: string, 
    description: string, 
    price: number, 
    active: boolean, 
    categorySet: CategorySetRequest[], 
    ingredientList: IngredientListRequest[]
    ){
    this.name = name;
    this.description = description;
    this.price = price;
    this.active = active;
    this.categorySet = categorySet;
    this.ingredientList = ingredientList;
  }
}

export default ProductRequest;