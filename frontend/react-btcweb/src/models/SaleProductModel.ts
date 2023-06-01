import ProductModel from "./ProductModel";

class SaleProductModel {
  id: number;
  product: ProductModel;
  amount: number;

  constructor(id: number, product: ProductModel, amount: number) {
    this.id = id;
    this.product = product;
    this.amount = amount;
  }
}

export default SaleProductModel;