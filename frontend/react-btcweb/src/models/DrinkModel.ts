class DrinkModel {
  id: number;
  name: string;
  description: string;
  price: number;
  category?: string;
  img?: string;

  constructor(id: number, name: string, description: string, price: number, category?: string, img?: string){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.img = img;
  }


}

export default DrinkModel;