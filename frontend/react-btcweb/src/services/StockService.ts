import DepositRequest from "../models/requests/DepositRequest";
import WithdrawRequest from "../models/requests/WithdrawRequest";
import authHeader from "./AuthHeader";

class StockService {

  private envUrl = process.env.REACT_APP_API_URL;
  private url = this.envUrl + '/api/stocks';
  private authToken = authHeader().Authorization;

  postNewDeposit = async (newStock: DepositRequest) => {
    const requestUrl = this.url + '/deposit'
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStock)
    }
    const response = await fetch(requestUrl, requestOptions);

    return response;
  }

  postNewWithdraw = async (request: WithdrawRequest) => {
    const requestUrl = this.url + '/withdraw'
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }
    const response = await fetch(requestUrl, requestOptions);

    return response;
  }
}

export default new StockService();