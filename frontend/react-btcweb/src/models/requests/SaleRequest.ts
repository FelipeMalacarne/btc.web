import ProductListRequest from "./ProductListRequest";

class SaleRequest {
  accountId: number;
  productList: ProductListRequest[];

  constructor(accountId: number, productList: ProductListRequest[]){
    this.accountId = accountId;
    this.productList = productList;
  }
}
export default SaleRequest;