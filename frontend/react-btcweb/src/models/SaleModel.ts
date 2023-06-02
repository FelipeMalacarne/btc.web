import AccountModel from "./AccountModel";
import ProductListModel from "./SaleProductModel";

class SaleModel {
  id: number;
  time: Date;
  total: number;
  account: AccountModel;
  productList: ProductListModel[];

  constructor(id: number, time: Date, total: number, account: AccountModel, productList: ProductListModel[]) {
    this.id = id;
    this.time = time;
    this.total = total;
    this.account = account;
    this.productList = productList;
  }
}

export default SaleModel;