import ProductModel from "./ProductModel";

class ProductListModel {
  product: ProductModel;
  amount: number;

  constructor(product: ProductModel, amount: number) {
    this.product = product;
    this.amount = amount;
  }
}

export default ProductListModel;