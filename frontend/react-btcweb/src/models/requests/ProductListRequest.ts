class ProductListRequest{
  productId: number;
  amount: number;

  constructor(productId: number, amount: number){
    this.productId = productId;
    this.amount = amount;
  }
}

export default ProductListRequest;