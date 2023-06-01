import AccountModel from "./AccountModel";
import SaleProductModel from "./SaleProductModel";

class SaleModel {
  id: number;
  time: Date;
  total: number;
  account: AccountModel;
  productList: SaleProductModel[];

  constructor(id: number, time: Date, total: number, account: AccountModel, productList: SaleProductModel[]) {
    this.id = id;
    this.time = time;
    this.total = total;
    this.account = account;
    this.productList = productList;
  }
}

export default SaleModel;