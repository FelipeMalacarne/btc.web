import SaleRequest from "../models/requests/SaleRequest";
import authHeader from "./AuthHeader";

class SaleService {
  private envUrl = process.env.REACT_APP_API_URL;
  private url = this.envUrl + '/api/sales';
  private authToken = authHeader().Authorization;

  postNewSale = async (newSale: SaleRequest) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSale)
    }
    const response = await fetch(this.url, requestOptions);

    return response;
  }

  
}

export default new SaleService();