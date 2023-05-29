import React, { useEffect, useState } from 'react'
import StockModel from '../models/StockModel';
import authHeader from '../services/AuthHeader';
import StockHistoryModel from '../models/StockHistoryModel';

export const useStockMovement = () => {
  const [stockMovement, setStockMovement] = useState<StockHistoryModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>('');

  const fetchStockMovement = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const Url = envUrl + '/api/stocks/movement';
    const token = authHeader().Authorization;

    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(Url, requestOptions);
    const responseData = await response.json();
    setStockMovement(responseData);
    setIsLoading(false);
    setHttpError('');
  }


  useEffect(() => {
    fetchStockMovement().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [])

  return { stockMovement, setStockMovement, isLoading, httpError}
}
