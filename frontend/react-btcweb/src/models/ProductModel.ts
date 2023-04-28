import CategoryModel from "./CategoryModel";
import IngredientListModel from "./IngredientListModel";

class ProductModel {
  id: number;
  name: string;
  description?: string;
  price: number;
  isActive?: boolean;
  categories: CategoryModel[];
  ingredientList: IngredientListModel[];


  constructor(
    id: number, 
    name: string, 
    description: string, 
    price: number, 
    isActive: boolean,
    categories: CategoryModel[],
    ingredientList: IngredientListModel[]

    ){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.isActive = isActive;
    this.categories = categories;
    this.ingredientList = ingredientList;
  }


}

export default ProductModel;