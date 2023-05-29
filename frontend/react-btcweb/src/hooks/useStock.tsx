import React, { useEffect, useState } from 'react'
import StockModel from '../models/StockModel';
import authHeader from '../services/AuthHeader';

export const useStock = () => {
  const [stock, setStock] = useState<StockModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>('');

  const fetchStock = async () => {
    const envUrl = process.env.REACT_APP_API_URL;
    const Url = envUrl + '/api/stocks';
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
    setStock(responseData);
    setIsLoading(false);
    setHttpError('');
  }

  useEffect(() => {
    fetchStock().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [])
  
  return { stock, setStock, isLoading, httpError }
}
