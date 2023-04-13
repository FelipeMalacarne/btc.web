class DrinkModel {
  id: number;
  name: string;
  description?: string;
  price: number;
  isActive?: boolean;


  constructor(id: number, name: string, description: string, price: number, isActive?: boolean){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.isActive = isActive;
  }


}

export default DrinkModel;